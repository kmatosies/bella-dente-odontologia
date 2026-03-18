import { spawn } from 'node:child_process';

const children = [];
let shuttingDown = false;

function start(name, command, args) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: false,
    env: process.env,
  });

  child.on('exit', (code, signal) => {
    if (shuttingDown) {
      return;
    }

    console.error(`[dev:${name}] exited with code=${code ?? 'null'} signal=${signal ?? 'null'}`);
    shutdown(typeof code === 'number' ? code : 1);
  });

  children.push(child);
}

function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }

  setTimeout(() => process.exit(exitCode), 100);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

start('gemini-proxy', process.execPath, ['server/gemini-proxy.mjs']);
start('vite', process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'dev:client']);

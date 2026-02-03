// src/services/transactions.ts
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  where,
  Timestamp,
  type DocumentData,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Transaction } from "../types";

export type TransactionType = "income" | "expense";
export type PaymentMethod = "pix" | "cash" | "credit_card" | "debit_card" | "boleto" | string;

const COLLECTION = "transactions";

function toTimestamp(input?: unknown): Timestamp {
  if (!input) return Timestamp.now();
  if (input instanceof Timestamp) return input;
  if (input instanceof Date) return Timestamp.fromDate(input);
  if (typeof input === "string") {
    const d = new Date(input);
    return Number.isNaN(d.getTime()) ? Timestamp.now() : Timestamp.fromDate(d);
  }
  return Timestamp.now();
}

function normalize(id: string, data: DocumentData): Transaction {
  const ts = data?.date instanceof Timestamp ? data.date : toTimestamp(data?.date);
  return {
    id,
    description: String(data?.description ?? ""),
    amount: Number(data?.amount ?? 0),
    type: data?.type === "expense" ? "expense" : "income",
    date: ts.toDate().toISOString(),
    category: data?.category,
    status: data?.status,
    paymentMethod: data?.paymentMethod,
    patientId: data?.patientId,
    userId: String(data?.userId ?? ""),
  };
}

export const transactionsService = {
  async add(input: Omit<Transaction, "id">) {
    if (!input.userId) throw new Error("[transactionsService.add] userId é obrigatório.");

    const payload = {
      ...input,
      amount: Number(input.amount),
      type: input.type,
      date: toTimestamp(input.date),
      createdAt: Timestamp.now(),
    };

    try {
      const ref = await addDoc(collection(db, COLLECTION), payload);
      return {
        ...input,
        id: ref.id,
        date: (payload.date as Timestamp).toDate().toISOString(),
      };
    } catch (e) {
      console.error("[transactionsService.add] erro ao salvar:", e);
      throw e;
    }
  },

  async remove(id: string) {
    try {
      await deleteDoc(doc(db, COLLECTION, id));
    } catch (e) {
      console.error("[transactionsService.remove] erro ao deletar:", e);
      throw e;
    }
  },

  subscribeByUser(userId: string, cb: (items: Transaction[]) => void): Unsubscribe {
    const q = query(
      collection(db, COLLECTION),
      where("userId", "==", userId),
      orderBy("date", "desc")
    );

    return onSnapshot(
      q,
      (snap) => cb(snap.docs.map((d) => normalize(d.id, d.data()))),
      (err) => {
        console.error("[transactionsService.subscribeByUser] onSnapshot error:", err);
        throw err;
      }
    );
  },
};
// Fim src/services/transactions.ts
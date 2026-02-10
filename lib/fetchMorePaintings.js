import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  documentId,
  Timestamp,
} from "firebase/firestore";
import { db } from "../public/firebase/firebase";

const PAGE_SIZE = 24;

export async function fetchMorePaintings(cursor) {
  if (!cursor?.createdAtMs || !cursor?.id) {
    return { items: [], nextCursor: null };
  }

  const q = query(
    collection(db, "slike"),
    orderBy("created_at", "desc"),
    orderBy(documentId(), "desc"),
    startAfter(Timestamp.fromMillis(cursor.createdAtMs), cursor.id),
    limit(PAGE_SIZE),
  );

  const snap = await getDocs(q);

  const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  const last = snap.docs[snap.docs.length - 1];
  const nextCursor = last
    ? {
        createdAtMs: last.data().created_at?.toMillis?.() ?? null,
        id: last.id,
      }
    : null;

  return { items, nextCursor };
}

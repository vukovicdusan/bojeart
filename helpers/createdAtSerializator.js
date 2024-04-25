export const createdAtSerializator = (createdAt) => {
  // Convert Firestore Timestamp object to JavaScript Date object
  const date = new Date(
    createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
  );

  // Format the date to ISO string
  const isoString = date.toISOString();

  return isoString;
};

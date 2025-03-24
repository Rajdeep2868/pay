// Firebase error handler to gracefully handle connection issues
let hasShownFirebaseError = false;

export const handleFirebaseError = (error: any) => {
  console.warn("Firebase error:", error);
  
  // Only show the error once per session to avoid spamming the console
  if (!hasShownFirebaseError) {
    console.info("App will continue in offline mode. Some features might be limited.");
    hasShownFirebaseError = true;
  }
  
  return null;
};

export const isFirebaseError = (error: any): boolean => {
  if (!error) return false;
  
  const errorMessage = typeof error === 'string' 
    ? error.toLowerCase()
    : (error.message ? error.message.toLowerCase() : '');
  
  return (
    errorMessage.includes("firebase") || 
    errorMessage.includes("firestore") ||
    errorMessage.includes("webchannel") ||
    errorMessage.includes("offline") ||
    errorMessage.includes("permission")
  );
}; 
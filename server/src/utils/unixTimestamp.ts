export default function getUnixTimestampForNextDay(): number {
    // Fetch the current date and time
    const currentDate = new Date();
  
    // Add one day (24 hours) to the current date
    currentDate.setDate(currentDate.getDate() + 1);
  
    // Convert to Unix timestamp (seconds)
    return Math.floor(currentDate.getTime() / 1000);
  }
  
  // Example usage:
  const timestamp = getUnixTimestampForNextDay();
  
  
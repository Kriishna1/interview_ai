import React, { useEffect } from "react";
import { useNotification } from "./NotificationContext";

const NotificationCard: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = [];

    notifications.forEach((notification) => {
      timeoutIds.push(
        setTimeout(() => {
          removeNotification(notification.id);
        }, 3000)
      );
    });

    return () => timeoutIds.forEach(clearTimeout);
  }, [notifications, removeNotification]);

  return (
    <div className="space-y-2 w-screen max-w-2xl fixed right-5 bottom-4 h-screen pointer-events-none z-10 flex flex-col items-end justify-end">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          role="alert"
          className={`${
            notification.type === "success"
              ? "bg-green-100 border-green-500 text-green-900"
              : notification.type === "info"
              ? "bg-blue-100 border-blue-500 text-blue-900"
              : notification.type === "warning"
              ? "bg-yellow-100 border-yellow-500 text-yellow-900"
              : "bg-red-100 border-red-500 text-red-900"
          } dark:bg-gray-800 z-50 max-w-96 min-w-72 dark:border-gray-700 dark:text-gray-100 border-l-4 py-2 pr-8 pl-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-opacity-80 shadow-lg pointer-events-auto`}
        >
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 flex-shrink-0 mr-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-xs font-semibold">{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationCard;

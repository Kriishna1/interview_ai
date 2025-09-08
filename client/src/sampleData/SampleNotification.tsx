import { useNotification } from "@/components/Notifications/NotificationContext";
import { Notification } from "@/vite-env";
const { addNotification } = useNotification();
const handleClick = () => {
  const newNotification: Notification = {
    id: Date.now().toString(),
    type: "success",
    message: "Login Successful",
  };
  addNotification(newNotification);
};
handleClick();

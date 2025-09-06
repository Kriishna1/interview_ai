import { logoutUser } from "@/api/user.api";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@/components/Notifications/NotificationContext";
import { Notification } from "@/vite-env";
const Navbar = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: "success",
        message: "Logout Successful",
      };
      addNotification(newNotification);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-20 mx-auto w-full max-w-screen-md border  border-gray-100 bg-white/80 py-3 shadow-lg backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
        <div className="px-4">
          <div className="flex items-center justify-between">
            <div className="flex shrink-0">
              <a aria-current="page" className="flex items-center" href="/">
                <img className="h-7 w-auto" src="NotesLogo.png" alt="" />
                <p className="sr-only">Website Title</p>
              </a>
            </div>
            <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
              <a
                aria-current="page"
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                href="#"
              >
                MockMate
              </a>
            </div>
            {true ? (
              <div className="flex items-center justify-end gap-3">
                <button
                  className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-3">
                <a
                  className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                  href="/login"
                ></a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

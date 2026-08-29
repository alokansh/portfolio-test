import { useNavigate } from "react-router-dom";
import { currentUser } from "../mockData";

export default function PageHeader({ title, showBack = false }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="text-xl text-text1"
            aria-label="Back"
          >
            ‹
          </button>
        )}
        {!showBack && (
          <span className="text-[18px] font-bold text-primary">Khata</span>
        )}
      </div>
      <div className="text-center flex-1 text-[18px] font-bold text-text1">
        {title}
      </div>
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-xs font-bold"
      >
        {currentUser.initials}
      </div>
    </div>
  );
}

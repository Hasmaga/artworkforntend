import BodyHomePage from "./ui/BodyHomePage/BodyHomePage";
import HistoryBookingArt from "./ui/HistoryBookingArt/HistoryBookingArt";
import HistoryBookingArtworkDetail from "./ui/HistoryBookingArt/HistoryBookingArtworkDetail";
import Login from "./ui/Login/Login";
import Navbar from "./ui/Navbar/Navbar";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="">
        <Login />
      </div>
    </div>
  );
}

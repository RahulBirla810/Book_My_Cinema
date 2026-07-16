import "./App.css";
import "./index.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./components/Pages/Home";
import MoviesPage from "./components/Pages/MoviesPage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import CustomOtpInput from "./components/Auth/CustomOtpInput";
import AddCinema from "./components/Pages/AddCinema";
import AddMoviePage from "./components/superadmin/AddMoviePage";
import UpdateMoviePage from "./components/superadmin/UpdateMoviePage";
import AddCity from "./components/Pages/AddCity";
import UpdateScreen from "./components/Pages/UpdateScreen";
import AdminCinemas from "./components/Pages/AdminCinemas";
import AdminProtected from "./components/protected/AdminProtected";
import SuperAdminProtected from "./components/protected/SuperAdminProtected";
import ShowSeats from "./components/Pages/ShowSeats";
import AddShow from "./components/Pages/AddShow";
import LiveYourShow from "./components/Pages/LiveYourShow";
import CinemasShowPage from "./components/Pages/CinemasShowPage";
import TermsAndCounditionPage from "./components/Pages/TermsAndCounditionPage";
import TransactionPage from "./components/Pages/TransactionPage";
import LoaderPage from "./utils/LoaderPage";
import ScrollTop from "./utils/ScrollTop";
import BottomNavBar from "./components/common/BottomNavBar";
import PageNotFound from "./components/Pages/PageNotFound";
import MoviesListPage from "./components/Pages/MoviesListPage";
import CategoryListPage from "./components/Pages/CategoryListPage";
import CategoryDetailPage from "./components/Pages/CategoryDetailPage";
import OffersPage from "./components/Pages/OffersPage";
import GiftCardsPage from "./components/Pages/GiftCardsPage";
import ListYourShowPage from "./components/Pages/ListYourShowPage";
import FooterFilterPage from "./components/Pages/FooterFilterPage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 7000); // Loader duration

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoaderPage />;
  }

  return (
    <div className="w-full flex flex-col bg-richblack-900 font-inter">
      <Toaster position="top-center" />
      <ScrollTop />
      <Routes>
        {/* Open Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<CustomOtpInput />} />
        <Route
          path="/book/terms-conditions"
          element={<TermsAndCounditionPage />}
        />
        <Route path="/book/transactions" element={<TransactionPage />} />
        <Route path="/movie/:movieName/:movie_id" element={<MoviesPage />} />
        <Route path="/movies" element={<MoviesListPage />} />
        <Route path="/streams" element={<CategoryListPage />} />
        <Route path="/events" element={<CategoryListPage />} />
        <Route path="/plays" element={<CategoryListPage />} />
        <Route path="/sports" element={<CategoryListPage />} />
        <Route path="/activities" element={<CategoryListPage />} />
        <Route path="/listyourshow" element={<ListYourShowPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/giftcards" element={<GiftCardsPage />} />
        <Route path="/category/:type/detail/:id" element={<CategoryDetailPage />} />
        <Route
          path="/buytickets/:movie_id/:cinema_id/:timing/seats"
          element={<ShowSeats />}
        />
        <Route
          path="/shows/:movieName/:movie_id"
          element={<CinemasShowPage />}
        />

        {/* Super-Admin Routes */}
        <Route
          path="/movie/addMovie"
          element={
            <SuperAdminProtected>
              <AddMoviePage />
            </SuperAdminProtected>
          }
        />
        <Route
          path="/movie/updatemovie/:movie_id"
          element={
            <SuperAdminProtected>
              <UpdateMoviePage />
            </SuperAdminProtected>
          }
        />
        <Route
          path="/addCity"
          element={
            <SuperAdminProtected>
              <AddCity />
            </SuperAdminProtected>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/cinema/addCinema"
          element={
            <AdminProtected>
              <AddCinema />
            </AdminProtected>
          }
        />
        <Route
          path="/cinema/adminCinemas"
          element={
            <AdminProtected>
              <AdminCinemas />
            </AdminProtected>
          }
        />
        <Route
          path="/cinema/:cinemaId/updateScreen/:screenId"
          element={
            <AdminProtected>
              <UpdateScreen />
            </AdminProtected>
          }
        />
        <Route
          path="/show/addShow/:movie_id"
          element={
            <AdminProtected>
              <AddShow />
            </AdminProtected>
          }
        />
        <Route
          path="/show/liveYourShow"
          element={
            <AdminProtected>
              <LiveYourShow />
            </AdminProtected>
          }
        />
        <Route path="/:slug" element={<FooterFilterPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

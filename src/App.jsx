import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import AuthProvider from "./features/auth/context/AuthProvider";
import BookmarksProvider from "./features/bookmarks/context/BookmarksProvider";
import Header from "./shared/components/Header/Header";
import HotelLayout from "./features/hotels/layout/HotelLayout";
import Hotels from "./features/hotels/components/Hotels";
import SingleHotel from "./features/hotels/components/SingleHotel";
import ProtectedRoute from "./shared/components/ProtectedRoute/ProtectedRoute";
import BookmarkLayout from "./features/bookmarks/layout/BookmarkLayout";
import BookmarkList from "./features/bookmarks/components/BookmarkList";
import AddNewBookmak from "./features/bookmarks/components/AddBookmarkPage";
import Login from "./features/auth/components/Login";
import SingleBookmark from "./features/bookmarks/components/SingleBookmark";
import HotelsProvider from "./features/hotels/context/HotelsProvider";
import LocationList from "./features/hotels/components/LocationList";

function App() {
  return (
    <AuthProvider>
      <BookmarksProvider>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<HotelLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route
              path="/bookmark"
              element={
                <ProtectedRoute>
                  <BookmarkLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<BookmarkList />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<AddNewBookmak />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </HotelsProvider>
      </BookmarksProvider>
    </AuthProvider>
  );
}

export default App;

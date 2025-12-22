import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { HiTrash, HiLocationMarker, HiBookmark } from "react-icons/hi";
import { useBookmark } from "../context/BookmarksProvider";
import Loader from "../../../shared/components/Loader/Loader";

function BookmarkList() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmark();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this bookmark?")) {
      await deleteBookmark(id);
    }
  };

  if (isLoading) return <Loader title="Loading bookmarks..." />;

  if (!bookmarks.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <HiBookmark />
        </div>
        <h2>No Bookmarks Yet</h2>
        <p>
          You havent saved any locations yet. Start by adding some bookmarks!
        </p>
        <Link to="/addBookmark" className="btn-primary">
          <HiLocationMarker /> Add Your First Bookmark
        </Link>
      </div>
    );
  }

  return (
    <div className="bookmark-list-page">
      <div className="page-header">
        <h1>
          <HiBookmark /> Saved Locations ({bookmarks.length})
        </h1>
        <Link to="/bookmark/add" className="add-btn">
          <HiLocationMarker /> Add New
        </Link>
      </div>

      <div className="bookmarks-grid">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className={`bookmark-card ${
              bookmark.id === currentBookmark?.id ? "active" : ""
            }`}
          >
            <Link
              to={`/bookmark/${bookmark.id}?lat=${bookmark.latitude}&lng=${bookmark.longitude}`}
              className="bookmark-link"
            >
              <div className="bookmark-content">
                <div className="bookmark-header">
                  <div className="location-flag">
                    <ReactCountryFlag
                      svg
                      countryCode={bookmark.countryCode}
                      style={{
                        fontSize: "2em",
                        lineHeight: "2em",
                      }}
                      title={bookmark.country}
                    />
                  </div>
                  <div className="location-info">
                    <h3>{bookmark.cityName}</h3>
                    <p className="country">{bookmark.country}</p>
                  </div>
                </div>

                <div className="location-details">
                  <div className="coordinates">
                    <span>📍</span>
                    <span>
                      {parseFloat(bookmark.latitude).toFixed(4)},{" "}
                      {parseFloat(bookmark.longitude).toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            <div className="bookmark-actions">
              <button
                onClick={(e) => handleDelete(e, bookmark.id)}
                className="delete-btn"
                aria-label="Delete bookmark"
                title="Delete bookmark"
              >
                <HiTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bookmarks-summary">
        <p>
          <strong>Total locations:</strong> {bookmarks.length} bookmark
          {bookmarks.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}

export default BookmarkList;

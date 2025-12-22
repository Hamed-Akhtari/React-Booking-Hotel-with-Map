import { useBookmark } from "../context/BookmarksProvider";
import SidebarMapLayout from "../../../shared/layout/SidebarMapLayout";

function BookmarkLayout() {
  const { bookmarks, currentBookmark, isLoading } = useBookmark();

  return (
    <SidebarMapLayout
      items={bookmarks}
      currentItem={currentBookmark}
      isLoading={isLoading}
      emptyMessage="No Bookmarks Found"
      emptyDescription="Try Adding Some Bookmarks First By Click On Map"
    />
  );
}

export default BookmarkLayout;

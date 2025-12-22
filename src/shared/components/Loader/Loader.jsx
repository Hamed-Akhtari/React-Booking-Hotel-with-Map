function Loader({ title = "" }) {
  return (
    <div className="sidebar-loading">
      <div className="loading-spinner"></div>
      <p>Loading {title}...</p>
    </div>
  );
}

export default Loader;

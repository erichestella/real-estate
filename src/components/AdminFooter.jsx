import './AdminFooter.css'

function AdminFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="admin-footer">
      <div className="admin-footer__inner">
        <span>
          <i className="fa-regular fa-copyright" aria-hidden="true"></i> {year} Your RealState. Admin Console.
        </span>
        <span className="admin-footer__status">
          <i className="fa-solid fa-circle admin-footer__status-dot" aria-hidden="true"></i>
          All systems operational
        </span>
      </div>
    </footer>
  )
}

export default AdminFooter

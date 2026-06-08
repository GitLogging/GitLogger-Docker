export async function PageHeaderContent() {
    /**
     * @summary Page header content for the GitLogger app. This section includes the main title, a subtitle, and a call-to-action button
     */
    return (
        <section className="hero">
            <h1>
                <a href="https://gitlogger.com/">GitLogger</a>: Watch Your Git
            </h1>
            <p className="hero-sub">GitLogger is a simple service that helps you understand your codebase — one commit at a time.</p>
            <nav>
                <div className="nav-inner">
                    <ul className="nav-menu">
                        <li><a href="/list">My Repos</a></li>
                        <li><a href="/">About GitLogger</a></li>
                    </ul>
                </div>
            </nav>
        </section>
    )
}

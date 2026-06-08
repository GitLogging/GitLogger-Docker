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
            <a href="/list" className="cta-btn">Your Git Repos</a>
            <nav className="dhero-nav">
                <ul><li><a href="#features">Features</a></li></ul>
                <ul><li><a href="#pricing">Pricing</a></li></ul>


            </nav>
        </section>
    )
}

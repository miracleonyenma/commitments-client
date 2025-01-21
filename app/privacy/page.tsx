const Privacy = () => {
  return (
    <main>
      <header className="site-section">
        <div className="wrapper">
          <h1 className="text-2xl font-bold lg:text-3xl">Privacy Policy</h1>
          <p>Last updated: Jan 21, 2025</p>
        </div>
      </header>
      <article className="site-section">
        <div className="wrapper prose">
          <section>
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us when using our
              service, including:
            </p>
            <ul>
              <li>GitHub account information when you authenticate</li>
              <li>
                Repository and commit data necessary for our service
                functionality
              </li>
              <li>Any additional information you choose to provide</li>
            </ul>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process and complete transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
            </ul>
          </section>

          <section>
            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information only in the following
              circumstances:
            </p>
            <ul>
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent abuse of our services</li>
            </ul>
          </section>

          <section>
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information. However, no method of
              transmission over the Internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at: [Your Contact Information]
            </p>
          </section>
        </div>
      </article>
    </main>
  );
};

export default Privacy;

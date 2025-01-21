const Terms = () => {
  return (
    <main>
      <header className="site-section">
        <div className="wrapper">
          <h1 className="text-2xl font-bold lg:text-3xl">Terms of Service</h1>
          <p>Last updated: Jan 21, 2025</p>
        </div>
      </header>
      <article className="site-section">
        <div className="wrapper prose">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using our service, you agree to be bound by these
              Terms of Service. If you do not agree to these terms, please do
              not use our service.
            </p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>
              Our service provides GitHub repository analysis and commitment
              tracking tools. We reserve the right to modify, suspend, or
              discontinue any part of the service at any time.
            </p>
          </section>

          <section>
            <h2>3. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate information when using our service</li>
              <li>Maintain the security of your account credentials</li>
              <li>
                Use the service in compliance with applicable laws and
                regulations
              </li>
              <li>
                Not engage in any activity that interferes with or disrupts the
                service
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Intellectual Property</h2>
            <p>
              All content, features, and functionality of our service are owned
              by us and protected by international copyright, trademark, and
              other intellectual property laws.
            </p>
          </section>

          <section>
            <h2>5. Limitation of Liability</h2>
            <p>
              Our service is provided &apos;as is&apos; without any warranties.
              We shall not be liable for any damages arising from the use or
              inability to use our service.
            </p>
          </section>

          <section>
            <h2>6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes through our service.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
};

export default Terms;

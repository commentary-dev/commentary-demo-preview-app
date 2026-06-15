(function commentaryDemoPreviewApp() {
  const basePath = "/commentary-demo-preview-app";
  const routes = new Map([
    ["/", renderHome],
    ["/settings/billing", renderBilling],
    ["/usage", renderUsage],
    ["/checkout", renderCheckout],
  ]);

  function normalizeRoute() {
    const withoutBase = window.location.pathname.replace(new RegExp(`^${basePath}`), "") || "/";
    const normalized = withoutBase.length > 1 ? withoutBase.replace(/\/+$/u, "") : withoutBase;
    return routes.has(normalized) ? normalized : "/";
  }

  function nav(currentRoute) {
    const links = [
      ["/", "Overview"],
      ["/settings/billing", "Billing"],
      ["/usage", "Usage"],
      ["/checkout", "Checkout"],
    ];
    return `
      <header class="topbar">
        <span class="brand">Acme Admin</span>
        ${links.map(([route, label]) => `
          <a href="${basePath}${route === "/" ? "/" : route}" data-route="${route}" ${currentRoute === route ? 'aria-current="page"' : ""}>${label}</a>
        `).join("")}
      </header>
    `;
  }

  function layout(route, content) {
    return `${nav(route)}<main class="app-shell">${content}</main>`;
  }

  function renderHome() {
    return layout("/", `
      <section class="hero" data-review-id="overview-hero" data-commentary-id="DemoPreview.overviewHero" data-commentary-component="OverviewHero" data-commentary-source="src/app/overview/OverviewHero.tsx:12:1" aria-label="Preview overview">
        <p class="eyebrow">GitHub Pages demo app</p>
        <h1>Review a customer admin workflow before launch.</h1>
        <p class="lede">This opted-in static preview demonstrates how Commentary reviewers can inspect a real app flow: plan renewal messaging, usage limits, and checkout confirmation copy.</p>
        <button type="button" data-route="/settings/billing" data-commentary-id="DemoPreview.startBilling" data-commentary-component="OverviewHero" data-commentary-source="src/app/overview/OverviewHero.tsx:28:7">Review billing settings</button>
      </section>
      <section class="grid" aria-label="Review surfaces">
        <article class="metric" data-commentary-id="DemoPreview.billingCard" data-commentary-component="SurfaceCard" data-commentary-source="src/app/overview/SurfaceCard.tsx:41:5">
          <span class="pill">Billing</span>
          <h2>Plan renewal</h2>
          <p>Clarify whether plan changes apply immediately or at renewal.</p>
        </article>
        <article class="metric" data-commentary-id="DemoPreview.usageCard" data-commentary-component="SurfaceCard" data-commentary-source="src/app/overview/SurfaceCard.tsx:49:5">
          <span class="pill">Usage</span>
          <h2>Threshold warnings</h2>
          <p>Review usage copy before customers hit a limit.</p>
        </article>
        <article class="metric" data-commentary-id="DemoPreview.checkoutCard" data-commentary-component="SurfaceCard" data-commentary-source="src/app/overview/SurfaceCard.tsx:57:5">
          <span class="pill">Checkout</span>
          <h2>Confirmation flow</h2>
          <p>Validate the final action and post-submit state.</p>
        </article>
      </section>
    `);
  }

  function renderBilling() {
    return layout("/settings/billing", `
      <section class="hero">
        <p class="eyebrow">Settings</p>
        <h1>Billing settings</h1>
        <p class="lede">Review plan usage, renewal timing, billing-owner controls, and the confirmation language customers see before changing plans.</p>
      </section>
      <section class="two-column">
        <article class="panel" data-review-id="billing-summary" data-commentary-id="DemoBilling.billingSummary" data-commentary-component="BillingSummary" data-commentary-source="src/app/settings/billing/BillingSummary.tsx:42:1" aria-label="Billing summary">
          <span class="pill">Renewal</span>
          <h2>Billing summary</h2>
          <p>Usage renews on June 30. Plan changes apply immediately to seat limits, while invoice changes appear on the next renewal statement.</p>
          <div class="status-row"><span>Billing owner</span><strong>finance-admin@example.test</strong></div>
          <div class="status-row"><span>Current plan</span><strong>Business</strong></div>
          <div class="status-row"><span>Renewal date</span><strong>June 30</strong></div>
        </article>
        <aside class="panel" data-commentary-id="DemoBilling.approvalPanel" data-commentary-component="BillingApprovalPanel" data-commentary-source="src/app/settings/billing/BillingApprovalPanel.tsx:18:1">
          <h2>Approval policy</h2>
          <ul class="checklist">
            <li>Plan upgrades require billing-owner approval.</li>
            <li>Downgrades warn when usage exceeds new limits.</li>
            <li>Support receives an audit note after confirmation.</li>
          </ul>
        </aside>
      </section>
      <section class="panel">
        <h2>Available plans</h2>
        <div class="grid">
          <article class="plan"><h3>Team</h3><p>For small review teams validating Markdown and HTML content.</p><strong>$49 / month</strong></article>
          <article class="plan"><h3>Business</h3><p>For cross-functional review programs with share links and agent handoff.</p><strong>$149 / month</strong></article>
          <article class="plan"><h3>Enterprise</h3><p>For governed provider access, audit workflows, and private support.</p><strong>Custom</strong></article>
        </div>
      </section>
      <section class="panel" data-review-id="confirm-plan" data-commentary-id="DemoBilling.confirmPlan" data-commentary-component="ConfirmPlanPanel" data-commentary-source="src/app/settings/billing/ConfirmPlanPanel.tsx:24:1">
        <h2>Confirm changes</h2>
        <p>Changing to Enterprise increases the seat cap immediately and schedules invoice changes for the next renewal statement.</p>
        <button data-review-id="save-plan" data-commentary-id="DemoBilling.savePlan" data-commentary-component="SavePlanButton" data-commentary-source="src/app/settings/billing/SavePlanButton.tsx:18:1" type="button">Save changes</button>
      </section>
    `);
  }

  function renderUsage() {
    return layout("/usage", `
      <section class="hero" data-review-id="usage-hero" data-commentary-id="DemoUsage.usageHero" data-commentary-component="UsageHero" data-commentary-source="src/app/usage/UsageHero.tsx:11:1">
        <p class="eyebrow">Usage</p>
        <h1>Usage overview</h1>
        <p class="lede">Review the threshold warnings and account health language customers see before a plan change is required.</p>
      </section>
      <section class="grid" aria-label="Usage metrics">
        <article class="metric" data-commentary-id="DemoUsage.reviewMinutes" data-commentary-component="UsageMetric" data-commentary-source="src/app/usage/UsageMetric.tsx:21:5"><strong>84%</strong><span>Review minutes used</span></article>
        <article class="metric" data-commentary-id="DemoUsage.agentRuns" data-commentary-component="UsageMetric" data-commentary-source="src/app/usage/UsageMetric.tsx:27:5"><strong>312</strong><span>Agent context packets generated</span></article>
        <article class="metric" data-commentary-id="DemoUsage.openThreads" data-commentary-component="UsageMetric" data-commentary-source="src/app/usage/UsageMetric.tsx:33:5"><strong>47</strong><span>Open review threads</span></article>
      </section>
      <section class="panel" data-review-id="usage-warning" data-commentary-id="DemoUsage.thresholdWarning" data-commentary-component="ThresholdWarning" data-commentary-source="src/app/usage/ThresholdWarning.tsx:16:1">
        <h2>Threshold warning</h2>
        <p>Your team is projected to reach the Business review-minute limit before the June 30 renewal. Upgrade now to avoid paused agent handoff on private reviews.</p>
        <button type="button" class="secondary" data-commentary-id="DemoUsage.contactOwner" data-commentary-component="ThresholdWarning" data-commentary-source="src/app/usage/ThresholdWarning.tsx:25:7">Notify billing owner</button>
      </section>
      <section class="panel">
        <h2>Usage by surface</h2>
        <table>
          <thead><tr><th>Surface</th><th>Usage</th><th>Reviewer note</th></tr></thead>
          <tbody>
            <tr><td>Markdown PRs</td><td>128 reviews</td><td>High adoption across docs and release notes.</td></tr>
            <tr><td>Static HTML</td><td>21 reports</td><td>Most comments target generated tables and launch checklists.</td></tr>
            <tr><td>Live Preview</td><td>9 previews</td><td>Billing and checkout routes account for most selected-element comments.</td></tr>
          </tbody>
        </table>
      </section>
    `);
  }

  function renderCheckout() {
    return layout("/checkout", `
      <section class="hero" data-review-id="checkout-hero" data-commentary-id="DemoCheckout.checkoutHero" data-commentary-component="CheckoutHero" data-commentary-source="src/app/checkout/CheckoutHero.tsx:10:1">
        <p class="eyebrow">Checkout</p>
        <h1>Plan change checkout</h1>
        <p class="lede">Review the final confirmation state before the customer upgrades from Business to Enterprise.</p>
      </section>
      <section class="two-column">
        <article class="checkout-card" data-review-id="checkout-summary" data-commentary-id="DemoCheckout.orderSummary" data-commentary-component="OrderSummary" data-commentary-source="src/app/checkout/OrderSummary.tsx:22:1">
          <h2>Order summary</h2>
          <div class="status-row"><span>New plan</span><strong>Enterprise</strong></div>
          <div class="status-row"><span>Seat cap</span><strong>250 reviewers</strong></div>
          <div class="status-row"><span>Effective date</span><strong>Today for limits, June 30 for billing</strong></div>
          <p>The effective-date copy should match the billing settings page.</p>
        </article>
        <aside class="checkout-card" data-commentary-id="DemoCheckout.securityNote" data-commentary-component="SecurityNote" data-commentary-source="src/app/checkout/SecurityNote.tsx:14:1">
          <h2>Security note</h2>
          <p>Provider permissions remain authoritative. The plan change does not grant repository access to additional users.</p>
        </aside>
      </section>
      <section class="panel" data-review-id="submit-order" data-commentary-id="DemoCheckout.submitOrderPanel" data-commentary-component="SubmitOrderPanel" data-commentary-source="src/app/checkout/SubmitOrderPanel.tsx:31:1">
        <h2>Submit order</h2>
        <p>A confirmation email will go to the billing owner and workspace admins.</p>
        <button type="button" aria-label="Submit plan change" data-commentary-id="DemoCheckout.submitOrder" data-commentary-component="SubmitOrderButton" data-commentary-source="src/app/checkout/SubmitOrderButton.tsx:12:1">Submit plan change</button>
      </section>
    `);
  }

  function navigate(route) {
    const nextPath = route === "/" ? `${basePath}/` : `${basePath}${route}`;
    window.history.pushState({}, "", nextPath);
    render();
  }

  function render() {
    const route = normalizeRoute();
    const renderer = routes.get(route) || renderHome;
    const app = document.getElementById("app");
    if (!app) {
      return;
    }
    app.innerHTML = renderer();
    document.querySelectorAll("[data-route]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        navigate(link.getAttribute("data-route") || "/");
      });
    });
    document.querySelectorAll("button[data-route]").forEach((button) => {
      button.addEventListener("click", () => navigate(button.getAttribute("data-route") || "/"));
    });
  }

  window.addEventListener("popstate", render);
  render();
})();

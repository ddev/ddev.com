class DdevSponsorsBanner extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    const goal = 12000
    fetch(
      "https://raw.githubusercontent.com/ddev/sponsorship-data/refs/heads/main/data/all-sponsorships.json"
    )
      .then((response) => response.json())
      .then((json) => {
        const income = json.total_monthly_average_income;
        const percentage = Math.min((income / goal) * 100, 100).toFixed(0);
        const formattedIncome = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(income)

        const formattedGoal = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(goal)

        this.shadowRoot.innerHTML = `
          <style>
            .ddev-sponsor-us-banner {
              --ddev-sub-color-blue: #02a8e2;
              --ddev-sub-color-blue-button: #027ba7;
              --ddev-sub-color-blue-button-hover: #015471;
              
              --ddev-sub-color-black: #1e2127;
              --ddev-sub-color-white: #ffffff;
              --ddev-sub-spacing: 1rem;

              font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif);
              background: var(--ddev-sub-color-black);
              color: var(--ddev-sub-color-white);
              padding: var(--ddev-sub-spacing);
              display: block;
              box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            }

            .ddev-sponsor-us-banner *,
            .ddev-sponsor-us-banner *::before,
            .ddev-sponsor-us-banner *::after {
              box-sizing: border-box;
            }

            .ddev-sponsor-us-banner__inner {
              max-width: 57rem;
              margin: 0 auto;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: space-between;
              gap: 1rem;
            }

            .ddev-sponsor-us-banner__content {
              flex-grow: 1;
              min-width: 0;
            }

            .ddev-sponsor-us-banner__amounts {
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              font-weight: bold;
            }

            .ddev-sponsor-us-banner__progress {
              height: 8px;
              border-radius: 4px;
              background: rgba(255,255,255,0.2);
              overflow: hidden;
              margin: 6px 0;
            }

            .ddev-sponsor-us-banner__fill {
              height: 100%;
              background: var(--ddev-sub-color-blue);
              width: ${percentage}%;
              transition: width 0.5s ease;
            }

            .ddev-sponsor-us-banner__meta {
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              margin-bottom: 0.5rem;
            }

            .ddev-sponsor-us-banner__cta {
              font-weight: bold;
            }

            .ddev-sponsor-us-banner__link {
              background-color: var(--ddev-sub-color-blue-button);
              color: var(--ddev-sub-color-white);
              padding: 0.6rem 1rem;
              border-radius: 4px;
              border: none;
              font-weight: bold;
              cursor: pointer;
              text-decoration: none;
              white-space: nowrap;
              text-align: center;
              transition: background-color 0.2s ease;
            }

            .ddev-sponsor-us-banner__link:hover {
              background-color: var(--ddev-sub-color-blue-button-hover);
              text-decoration: none;
            }

            @media (max-width: 600px) {
              .ddev-sponsor-us-banner__inner {
                flex-direction: column;
                align-items: stretch;
                text-align: center;
              }

              .ddev-sponsor-us-banner__link {
                width: 100%;
              }
            }
          </style>

          <div class="ddev-sponsor-us-banner">
            <div class="ddev-sponsor-us-banner__inner">
              <div class="ddev-sponsor-us-banner__content">
                <div class="ddev-sponsor-us-banner__amounts">
                  <span>Raised: ${formattedIncome}</span>
                  <span>Goal: ${formattedGoal}</span>
                </div>
                <div class="ddev-sponsor-us-banner__progress">
                  <div class="ddev-sponsor-us-banner__fill"></div>
                </div>
                <div class="ddev-sponsor-us-banner__meta">
                  <span>${percentage}% of monthly goal</span>
                  <span class="ddev-sponsor-us-banner__cta">Help us cross the finish line!</span>
                </div>
              </div>
              <a class="ddev-sponsor-us-banner__link" href="https://github.com/sponsors/ddev" target="_blank">Sponsor Now</a>
            </div>
          </div>
        `
      })
  }
}

customElements.define("ddev-sponsors-banner", DdevSponsorsBanner)

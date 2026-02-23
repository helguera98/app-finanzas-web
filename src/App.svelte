<script>
  import Home from "./lib/pages/Home.svelte";
  import Bills from "./lib/pages/Bills.svelte";
  import Loans from "./lib/pages/Loans.svelte";
  import Insights from "./lib/pages/Insights.svelte";
  import Profile from "./lib/pages/Profile.svelte";
  import Login from "./lib/pages/Login.svelte";
  import Register from "./lib/pages/Register.svelte";
  import Landing from "./lib/pages/Landing.svelte";
  import NewTransaction from "./lib/pages/NewTransaction.svelte";
  import NewBill from "./lib/pages/NewBill.svelte";
  import NewLoan from "./lib/pages/NewLoan.svelte";
  import Categories from "./lib/pages/Categories.svelte";
  import BottomNav from "./lib/components/BottomNav.svelte";

  import { onMount } from "svelte";
  import { api } from "./lib/api";

  let activeTab = "landing";
  let navData = null;
  let isLoggedIn = false;
  let isCheckingAuth = true;
  let user = null;

  async function fetchUser() {
    console.log("[App] Fetching user profile...");
    try {
      const userData = await api.getMe();
      user = userData;
      console.log("[App] User profile loaded:", user.email);

      // Update tab before switching isLoggedIn to ensure smooth transition
      if (
        activeTab === "landing" ||
        activeTab === "login" ||
        activeTab === "register"
      ) {
        activeTab = "home";
      }
      isLoggedIn = true;
    } catch (e) {
      console.error("[App] Auth check failed:", e);
      isLoggedIn = false;
      user = null;
      localStorage.removeItem("auth_token");

      // If we failed auth, and were not on landing/register, go to login
      if (activeTab !== "register" && activeTab !== "landing") {
        activeTab = "login";
      }
    }
  }

  onMount(async () => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      await fetchUser();
    } else {
      activeTab = "landing";
    }
    isCheckingAuth = false;
  });

  async function handleLogin() {
    await fetchUser();
  }

  function handleLogout() {
    api.logout();
    isLoggedIn = false;
    user = null;
    activeTab = "landing";
  }

  function handleNavigate(event) {
    if (typeof event.detail === "string") {
      activeTab = event.detail;
      navData = null;
    } else {
      activeTab = event.detail.tab;
      navData = event.detail.data;
    }
  }
</script>

<div
  class="min-h-screen bg-[#05050a] flex justify-center items-center font-display overflow-hidden"
>
  <!-- Desktop Decorative Background -->
  <div class="fixed inset-0 pointer-events-none opacity-20">
    <div
      class="absolute top-[-10%] left-[-10%] size-[40%] bg-primary blur-[120px] rounded-full"
    ></div>
    <div
      class="absolute bottom-[-10%] right-[-10%] size-[40%] bg-accent-mint blur-[120px] rounded-full"
    ></div>
  </div>

  <div
    class="mobile-frame w-full h-screen max-w-[480px] bg-background-dark relative shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
  >
    {#if isCheckingAuth}
      <div
        class="h-full w-full bg-background-dark flex items-center justify-center"
      >
        <div
          class="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"
        ></div>
      </div>
    {:else if !isLoggedIn}
      <div class="flex-1 overflow-y-auto hide-scrollbar">
        {#if activeTab === "landing"}
          <Landing on:navigate={handleNavigate} />
        {:else if activeTab === "register"}
          <Register
            on:navigate={handleNavigate}
            on:registered={() => (activeTab = "login")}
          />
        {:else}
          <Login on:login={handleLogin} on:navigate={handleNavigate} />
        {/if}
      </div>
    {:else}
      <!-- Protected Routes -->
      <div class="flex-1 overflow-y-auto hide-scrollbar">
        {#if activeTab === "new_transaction"}
          <NewTransaction on:navigate={handleNavigate} data={navData} />
        {:else if activeTab === "new_bill"}
          <NewBill on:navigate={handleNavigate} />
        {:else if activeTab === "new_loan"}
          <NewLoan on:navigate={handleNavigate} />
        {:else}
          <div class="app-container text-slate-100">
            {#if activeTab === "home"}
              <Home on:navigate={handleNavigate} {user} />
            {:else if activeTab === "bills"}
              <Bills on:navigate={handleNavigate} />
            {:else if activeTab === "categories"}
              <Categories on:navigate={handleNavigate} />
            {:else if activeTab === "loans"}
              <Loans on:navigate={handleNavigate} />
            {:else if activeTab === "insights"}
              <Insights on:navigate={handleNavigate} />
            {:else if activeTab === "profile"}
              <Profile
                on:navigate={handleNavigate}
                on:logout={handleLogout}
                {user}
              />
            {/if}
          </div>
        {/if}
      </div>

      {#if ["home", "bills", "categories", "loans", "insights", "profile"].includes(activeTab)}
        <BottomNav bind:activeTab />
      {/if}
    {/if}
  </div>
</div>

<style>
  :global(.material-symbols-outlined) {
    font-variation-settings:
      "FILL" 0,
      "wght" 400,
      "GRAD" 0,
      "opsz" 24;
  }
  :global(.fill-1) {
    font-variation-settings: "FILL" 1 !important;
  }

  .mobile-frame {
    /* Ensure height is correct for PWA standalone */
    height: 100dvh;
  }
</style>

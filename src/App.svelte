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
  import Sidebar from "./lib/components/Sidebar.svelte";

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
  class="h-screen w-full flex overflow-hidden bg-[#05050a] font-display text-slate-100"
>
  {#if isLoggedIn && !["landing", "login", "register"].includes(activeTab)}
    <!-- Desktop Sidebar (Hidden on mobile) -->
    <div class="hidden md:block">
      <Sidebar {activeTab} on:navigate={handleNavigate} />
    </div>
  {/if}

  <div class="flex-1 flex flex-col min-w-0 bg-background-dark relative">
    {#if isCheckingAuth}
      <div
        class="h-full w-full bg-background-dark flex items-center justify-center"
      >
        <div
          class="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"
        ></div>
      </div>
    {:else if !isLoggedIn}
      <div class="flex-1 overflow-y-auto bg-background-dark hide-scrollbar">
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
      <!-- Protected Routes Shell -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Scrollable Main Content Area -->
        <main
          class="flex-1 overflow-y-auto hide-scrollbar bg-background-dark p-0 md:p-6"
        >
          {#if activeTab === "new_transaction"}
            <NewTransaction on:navigate={handleNavigate} data={navData} />
          {:else if activeTab === "new_bill"}
            <NewBill on:navigate={handleNavigate} />
          {:else if activeTab === "new_loan"}
            <NewLoan on:navigate={handleNavigate} />
          {:else}
            <div class="w-full max-w-5xl mx-auto">
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
        </main>

        <!-- Mobile Bottom Nav -->
        {#if ["home", "bills", "categories", "loans", "insights", "profile"].includes(activeTab)}
          <div class="md:hidden">
            <BottomNav bind:activeTab />
          </div>
        {/if}
      </div>
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
</style>

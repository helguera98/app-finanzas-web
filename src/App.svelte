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

  let activeTab = "landing";
  let navData = null;
  let isLoggedIn = false;

  function handleLogin() {
    isLoggedIn = true;
    activeTab = "home";
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

{#if !isLoggedIn}
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
{:else if activeTab === "new_transaction"}
  <NewTransaction on:navigate={handleNavigate} data={navData} />
{:else if activeTab === "new_bill"}
  <NewBill on:navigate={handleNavigate} />
{:else if activeTab === "new_loan"}
  <NewLoan on:navigate={handleNavigate} />
{:else}
  <div class="app-container">
    {#if activeTab === "home"}
      <Home on:navigate={handleNavigate} />
    {:else if activeTab === "bills"}
      <Bills on:navigate={handleNavigate} />
    {:else if activeTab === "categories"}
      <Categories on:navigate={handleNavigate} />
    {:else if activeTab === "loans"}
      <Loans on:navigate={handleNavigate} />
    {:else if activeTab === "insights"}
      <Insights on:navigate={handleNavigate} />
    {:else if activeTab === "profile"}
      <Profile on:navigate={handleNavigate} />
    {/if}

    <BottomNav bind:activeTab />
  </div>
{/if}

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

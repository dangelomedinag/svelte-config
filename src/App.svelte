<script>
  import { onMount } from 'svelte';

  let name = 'world';
  let counter = 1;
  onMount(() => {
    console.log('component Mount');
  });
</script>

<main>
  <h1>Hello {name}</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
  <button on:click={() => counter--} disabled={counter <= 0}>-</button>
  {#key counter}
    <span style="padding: 0 1em">{counter}</span>
  {/key}
  <button on:click={() => counter++} disabled={counter >= 10}>+</button>
</main>

<style>
  span {
    display: inline-block;
    width: 80px;
  }

  button {
    display: inline-block;
    padding: 0 1em;
  }

  button:disabled {
    opacity: 0.3;
  }

  button:hover {
    background: #f2f2f2;
  }
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

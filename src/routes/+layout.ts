
import posthog from 'posthog-js'
import { browser } from '$app/environment';
import { onMount } from 'svelte';

export function load({ url }) {
  if (browser) {
    posthog.init(
      'phc_Nc0p1vOMks4SUXSJqviAVVmAuzaTuuI8uJw3S68HrZj',
      {
        api_host: 'https://us.i.posthog.com',
        defaults: '2025-05-24',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      }
    )
  }
  return { url: url.pathname };
}



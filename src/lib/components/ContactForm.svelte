<script lang="ts">
    import { slide } from 'svelte/transition';

    let formData = $state({
        name: '',
        email: '',
        message: ''
    });

    let errors = $state({
        name: '',
        email: '',
        message: ''
    });

    let isSubmitting = $state(false);
    let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
    let statusMessage = $state('');

    function validateForm() {
        let isValid = true;
        errors = { name: '', email: '', message: '' };

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        } else if (formData.name.length < 2) {
            errors.name = 'Name must be at least 2 characters';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email';
            isValid = false;
        }

        if (!formData.message.trim()) {
            errors.message = 'Message is required';
            isValid = false;
        } else if (formData.message.length < 10) {
            errors.message = 'Message must be at least 10 characters';
            isValid = false;
        }

        return isValid;
    }

    async function handleSubmit(e: Event) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        isSubmitting = true;
        submitStatus = 'idle';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                submitStatus = 'success';
                statusMessage = 'Thank you for your message! I\'ll get back to you soon.';

                // Reset form after success
                setTimeout(() => {
                    formData = { name: '', email: '', message: '' };
                    submitStatus = 'idle';
                }, 3000);
            } else {
                throw new Error(result.error || 'Failed to send message');
            }

        } catch (error) {
            submitStatus = 'error';
            statusMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again later.';
            console.error('Form submission error:', error);
        } finally {
            isSubmitting = false;
        }
    }

    function handleInput(field: 'name' | 'email' | 'message') {
        // Clear error when user starts typing
        if (errors[field]) {
            errors[field] = '';
        }
    }
</script>

<form onsubmit={handleSubmit} class="w-full space-y-6">
    <!-- Name Field -->
    <div>
        <label for="name" class="block text-sm font-medium text-white/80 mb-2">
            Name
        </label>
        <input
            type="text"
            id="name"
            bind:value={formData.name}
            oninput={() => handleInput('name')}
            disabled={isSubmitting}
            class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 backdrop-blur transition focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50"
            placeholder="Your name"
        />
        {#if errors.name}
            <p transition:slide={{ duration: 200 }} class="mt-2 text-sm text-red-400">
                {errors.name}
            </p>
        {/if}
    </div>

    <!-- Email Field -->
    <div>
        <label for="email" class="block text-sm font-medium text-white/80 mb-2">
            Email
        </label>
        <input
            type="email"
            id="email"
            bind:value={formData.email}
            oninput={() => handleInput('email')}
            disabled={isSubmitting}
            class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 backdrop-blur transition focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50"
            placeholder="your@email.com"
        />
        {#if errors.email}
            <p transition:slide={{ duration: 200 }} class="mt-2 text-sm text-red-400">
                {errors.email}
            </p>
        {/if}
    </div>

    <!-- Message Field -->
    <div>
        <label for="message" class="block text-sm font-medium text-white/80 mb-2">
            Message
        </label>
        <textarea
            id="message"
            bind:value={formData.message}
            oninput={() => handleInput('message')}
            disabled={isSubmitting}
            rows="5"
            class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 backdrop-blur transition focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50 resize-none"
            placeholder="Tell me about your project..."
        ></textarea>
        {#if errors.message}
            <p transition:slide={{ duration: 200 }} class="mt-2 text-sm text-red-400">
                {errors.message}
            </p>
        {/if}
    </div>

    <!-- Submit Button -->
    <button
        type="submit"
        disabled={isSubmitting}
        class="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3.5 text-white font-medium shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
    >
        <span class="relative flex items-center justify-center gap-2">
            {#if isSubmitting}
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
            {:else}
                Send Message
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            {/if}
        </span>
    </button>

    <!-- Status Message -->
    {#if submitStatus !== 'idle'}
        <div
            transition:slide={{ duration: 200 }}
            class="rounded-xl px-4 py-3 text-center {submitStatus === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}"
        >
            {statusMessage}
        </div>
    {/if}
</form>
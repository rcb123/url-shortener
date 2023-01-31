<script lang="ts">
	import { page } from '$app/stores';
</script>

<!-- Vertically centerd div-->
<div class="flex h-screen">
	<div class="m-auto px-6 py-3 w-[60vw] shadow-primary shadow-md rounded-2xl bg-base-200">
		<h1 class="text-2xl mb-0 text-primary">Welcome to Shortly,</h1>
		<p>the simplest and most efficient URL shortening service on the web.</p>
		<br />
		<p>
			Our easy-to-use interface allows you to quickly and easily shorten any long URL into a
			shorter, more manageable link.
		</p>
		<br />
		<p>
			Whether you're looking to share a link on social media, include it in an email or text
			message, or simply make a long link more manageable, Shortly has you covered.
		</p>
		<br />
		<p />

		<p>
			To get started, simply enter the long URL you wish to shorten in the field provided and click
			the "Shorten" button. In just a matter of seconds, you'll have a new, shorter link that you
			can use anywhere you need it.
		</p>
		<br />
		<p>
			Shortly also provides advanced features such as custom link and link analytics to make your
			short links more useful.
		</p>
		<br />
		<p>
			Try Shortly today and experience the convenience of having a simple and reliable URL
			shortening service at your fingertips.
		</p>
		<br />

		<div class="flex flex-row justify-between">
			<a href="/shorten">
				<button class="btn btn-primary mb-1 justify-start">Shorten your link now!</button>
			</a>
			{#if !$page.data.session}
				<label for="login-modal" class="btn btn-primary justify-end">login</label>
			{:else}
				<a href="/account">
					<button class="btn btn-primary mb-1">Account page</button>
				</a>
			{/if}
		</div>
	</div>
</div>

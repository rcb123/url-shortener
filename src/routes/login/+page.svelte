<script lang="ts">
	import SigninForm from '$components/SignupForm.svelte';
	export let form: any;
</script>

<SigninForm {form} action="/" />

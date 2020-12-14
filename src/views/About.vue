<template>
	<div class="about">
		<h1>This is an about page</h1>
		<h2>store值： count = {{ count }}</h2>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	computed: mapGetters(["count"])
};
</script>

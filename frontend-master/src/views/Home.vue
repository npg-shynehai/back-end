<template>
	<div class="home">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<FormComponent></FormComponent>
				</div>
			</div>
		</div>
		<div class="col-12">
			<ListTable></ListTable>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import FormComponent from '@/components/FormComponent.vue';
import ListTable from '@/components/ListTable.vue';

@Component({
  components: {
    HelloWorld,
    FormComponent,
    ListTable,
  },
})
export default class Home extends Vue {}
</script>


<template>
  <v-app>
    <v-app-bar app  color="primary" dark >
		<div class="d-flex align-center">
			
			Avaliação Empresta			
		</div>
      	<v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
		<v-container fluid>
			<simulacao></simulacao>
		</v-container>
    </v-main>
  </v-app>
</template>

<script>
import Simulacao from './components/Simulacao'
export default {
 	name: 'App',
	components: {
		Simulacao
	},
	data: () => ({
		//
	}),
};
</script>

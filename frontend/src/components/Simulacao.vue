<template>
    <div>
        <v-card v-show="!simulacoesCardVisible">
            <v-card-title class="grey--text text--darken-2 font-weight-bold" >Simulação de Empréstimo</v-card-title>
            <v-divider style="background-color: blue"></v-divider>
            <br>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-row class="mr-2 ml-2">
                    <v-col cols="12" :xs="12" :sm="6" :md="3">
                        <v-currency-field 
                            label="Valor do Empréstimo" 
                            v-model="form.valor_emprestimo"
                            prefix="R$"
                            :rules="[rules.required, rules.invalidValue ]"
                            outlined 
                            dense
                            ></v-currency-field>
                    </v-col>
                    <v-col cols="12" :xs="12" :sm="6" :md="3">
                        <v-select 
                            v-model="form.instituicoes" 
                            label="Instituições" 
                            item-text="valor" 
                            item-value="chave" 
                            :items="instituicoes"
                            multiple
                            outlined 
                            dense
                        ></v-select>
                    </v-col>
                    <v-col cols="12" :xs="12" :sm="6" :md="3">
                        <v-select 
                            v-model="form.convenios" 
                            label="Convênios" 
                            item-text="valor" 
                            item-value="chave" 
                            :items="convenios"
                            multiple
                            outlined 
                            dense
                        ></v-select>
                    </v-col>
                    <v-col cols="12" :xs="12" :sm="6" :md="3">
                        <v-select 
                            v-model="form.parcelas" 
                            label="Parcelas" 
                            item-text="valor" 
                            item-value="chave" 
                            :items="[36, 48, 60, 72, 84]"
                            outlined 
                            dense
                        ></v-select>
                    </v-col>
                </v-row>
            </v-form>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" class="mr-2 mb-2" @click="limparDados()">Limpar Dados</v-btn>
                <v-btn color="primary" class="mr-2 mb-2" @click="simular()">Simular</v-btn>
            </v-card-actions>
        </v-card>
        <br>
        <v-card v-show="simulacoesCardVisible">
            <v-card-title class="grey--text text--darken-2 font-weight-bold" >
                Simulaçoes
                <v-spacer></v-spacer>
                <v-btn color="success" class="mr-2 mb-2" @click="limparDados()">Fazer outra simulação</v-btn>
            </v-card-title>
            <v-divider style="background-color: blue"></v-divider>
            <br>
            <simulacao-grid :valor-emprestimo="form.valor_emprestimo" v-show="simulacoesBmg.length" instituicao="Bmg" :data="simulacoesBmg" />
            <simulacao-grid :valor-emprestimo="form.valor_emprestimo" v-show="simulacoesPan.length" instituicao="Pan" :data="simulacoesPan" />
            <simulacao-grid :valor-emprestimo="form.valor_emprestimo" v-show="simulacoesOle.length" instituicao="Ole" :data="simulacoesOle" />
        </v-card>
        <v-card v-show="noData">
            Teste
        </v-card>
    </div>
</template>

<script>
import ConveniosApi from '../Api/Convenios';
import InstituicoesApi from '../Api/Instituicoes';
import SimulacaoApi from '../Api/Simulacao';
import SimulacaoGrid from '../components/SimulacaoGrid';

export default {
    components: { SimulacaoGrid },
    data() {
        return {
            load: false,
            form: { valor_emprestimo: null },
            valid: true,
            instituicoes: [],
            convenios: [],
            parcelas: '',
            simulacoesBmg: [],
            simulacoesPan: [],
            simulacoesOle: [],
            noData: false,
            rules: {
                required: (value) => !!value || 'Campo obrigatório',
                invalidValue: () => this.form.valor_emprestimo > 0 || 'Informa um valor maior que 0',
            }
        }
    },
    mounted() {
        this.findAllInstituiçoes();
        this.findAllconvenios();
    },
    methods: {
        async findAllInstituiçoes() {
            try {
                let response = await InstituicoesApi.findAll();
                this.instituicoes = response.data;
            } catch (error) {
                console.log(error.response)
            }
        },
        async findAllconvenios() {
            try {
                let response = await ConveniosApi.findAll();
                this.convenios = response.data;
            } catch (error) {
                console.log(error.response)
            }
        },
        limparDados() {
            this.form = {};
            this.simulacoesBmg = [];
            this.simulacoesPan = [];
            this.simulacoesOle = [];
            this.form.valor_emprestimo = null;
            this.$refs.form.resetValidation();

        },
        async simular() {
            if(this.$refs.form.validate()) {
                try {
                    let response = await SimulacaoApi.simulacao(this.form);
                    if (Array.isArray(response.data) && !response.data.length) {
                        this.$swal('', 'Não houve resultado para o filtro aplicado.', 'info');
                    }
                    this.simulacoesBmg = response.data.BMG || [];
                    this.simulacoesPan = response.data.PAN || [];
                    this.simulacoesOle = response.data.OLE || [];
                } catch (error) {
                    console.log(error.response)
                }
            }
        }
    },
    computed: {
        simulacoesCardVisible() {
            return !!(this.simulacoesBmg.length || this.simulacoesPan.length || this.simulacoesOle.length )
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
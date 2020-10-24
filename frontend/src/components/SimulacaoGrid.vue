<template>
    <div>
        <v-simple-table>
            <template v-slot:top>
                <v-card-title class="warning--text text--darken-2 font-weight-bold subtitle-1" >{{ instituicao }}</v-card-title>
                <v-divider style="background-color: blue"></v-divider>
            </template>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Convênio</th>
                        <th class="text-left">Valor solicitado</th>
                        <th class="text-left">Taxa de juros ao mês</th>
                        <th class="text-left">N° de Parcelas</th>
                        <th class="text-left">Valor da Parcela</th>
                        <th class="text-left">Valor total do Emprestimo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="simulacao in data">
                    <td>{{ simulacao.convenio }}</td>
                    <td>{{ formatarValor(valorEmprestimo) }}</td>
                    <td>% {{ simulacao.taxa }}</td>
                    <td class="font-weight-bold indigo--text">{{ simulacao.parcelas }}</td>
                    <td class="font-weight-bold indigo--text">{{ formatarValor(simulacao.valor_parcela) }}</td>
                    <td class="font-weight-bold indigo--text">{{ formatarValor(simulacao.valor_parcela * simulacao.parcelas) }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-divider style="max-height: 5px; height: 3px; background-color: #555"></v-divider>
    </div>
</template>

<script>
    export default {
        name: 'SimulacaoGrid',
        props: {
            data: {
                default: []
            }, 
            instituicao: {
                default: '',
                type: String
            },
            valorEmprestimo: {
                default: 0
            }
        },
        methods: {
            formatarValor(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return 'R$ ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
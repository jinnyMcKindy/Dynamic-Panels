<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">From</th>
            <th class="text-left">To</th>
            <th class="text-left">Sum</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in transactions" :key="index">
            <td>
              <div v-for="(from, key) in item.from" :key="key">
                {{ from }}
              </div>
            </td>
            <td>
              <div v-for="(to, key) in item.to" :key="key">
                {{ to }}
              </div>
            </td>
            <td>{{ item.sum }} BTC</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div>{{ error }}</div>
  </div>
</template>
<script>
export default {
  name: "Table",
  props: {
    transactions: {
      type: Array,
      default: function() {
        return [];
      }
    },
    error: {
      type: String,
      default: ""
    }
  }
};
</script>

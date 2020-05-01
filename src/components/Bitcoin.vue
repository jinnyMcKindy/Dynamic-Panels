<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <router-link class="nav-link nav-link--light" :to="{ name: 'modals' }">
          Go to Modals
        </router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn small color="primary" @click="start">Запуск</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn small color="error" @click="stop">Остановка</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn small color="warning" @click="clear">Сброс</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3>Сумма: {{ total }} BTC</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Bitcoin",
  data: function() {
    return {
      error: "",
      transactions: [],
      socket: new WebSocket("wss://ws.blockchain.info/inv")
    };
  },
  computed: {
    total: function() {
      return this.transactions.reduce(
        (acc, val) => (acc += parseFloat(val.sum)),
        0
      );
    }
  },
  mounted() {
    this.socket.onmessage = event => {
      const data = JSON.parse(event.data)["x"];
      const from = [];
      const to = [];
      let satoshi = 0;
      data.inputs.forEach(prev => {
        from.push(prev.prev_out.addr);
      });
      data.out.forEach(out => {
        to.push(out.addr);
        satoshi += parseFloat(out.value);
      });
      const sum = parseFloat(satoshi) / 100000000;
      this.transactions.push({ from, to, sum });
    };

    this.socket.onclose = function(event) {
      if (event.wasClean) {
        this.error = `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`;
      } else {
        this.error = "[close] Соединение прервано";
      }
    };

    this.socket.onerror = function(error) {
      this.error = `[error] ${error.message}`;
    };
  },
  methods: {
    start() {
      this.socket.send(JSON.stringify({ op: "unconfirmed_sub" }));
    },
    stop() {
      this.socket.send(JSON.stringify({ op: "unconfirmed_unsub" }));
    },
    clear() {
      this.transactions = [];
    }
  }
};
</script>

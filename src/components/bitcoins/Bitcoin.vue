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
        <Button color="primary" :disabled="btn.start" @click="start"
          >Запуск</Button
        >
      </v-col>
      <v-col cols="3">
        <Button color="error" :disabled="!btn.start" @click="stop"
          >Остановка</Button
        >
      </v-col>
      <v-col cols="3">
        <Button color="warning" :disabled="!transactions.length" @click="clear"
          >Сброс</Button
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3>Сумма: {{ total }} BTC</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Table :transactions="transactions" :error="error" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Button from "./Button";
import Table from "./Table";
export default {
  name: "Bitcoin",
  components: { Button, Table },
  data: function() {
    return {
      error: "",
      transactions: [],
      socket: new WebSocket("wss://ws.blockchain.info/inv"),
      btn: {
        start: false
      }
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
      this.btn.start = true;
    },
    stop() {
      this.socket.send(JSON.stringify({ op: "unconfirmed_unsub" }));
      this.btn.start = false;
    },
    clear() {
      this.transactions = [];
    }
  }
};
</script>

<template>
  <div class="create">
    <h1>New Hero</h1>
    <form @submit="formSubmit" class="hero-form">
      <label>
        Name
        <input type="text" v-model="name" />
      </label>
      <h5>Points remaining: {{ totalStat }}</h5>
      <div class="stat-row">
        <button type="button" class="minus" @click="resetPoint('strength')">-</button>
        <p>Strength: {{ strength }}</p>
        <button type="button" class="plus" @click="usePoint('strength')">+</button>
      </div>
      <div class="stat-row">
        <button type="button" class="minus" @click="resetPoint('speed')">-</button>
        <p>Speed: {{ speed }}</p>
        <button type="button" class="plus" @click="usePoint('speed')">+</button>
      </div>
      <div class="stat-row">
        <button type="button" class="minus" @click="resetPoint('agility')">-</button>
        <p>Agility: {{ agility }}</p>
        <button type="button" class="plus" @click="usePoint('agility')">+</button>
      </div>

      <button type="submit">Create</button>
    </form>
    <h3 class="error">{{ error }}</h3>
    <h3 class="success">{{ success }}</h3>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Create",
  data() {
    return {
      totalStat: 10,
      name: "",
      strength: 0,
      agility: 0,
      speed: 0,
      error: "",
      success: ""
    };
  },
  methods: {
    async formSubmit(event) {
      event.preventDefault();
      if (this.name.length < 1) {
        this.error =
          "This hero has no name, and cannot claim any glory with no name.";
        return;
      } else {
        this.error = "";
      }

      try {
        const { data } = await axios.post("/api/hero/", {
          name: this.name,
          strength: this.strength,
          agility: this.agility,
          speed: this.speed
        });
        // console.log(data);
        this.name = "";
        this.strength = 0;
        this.agility = 0;
        this.speed = 0;
        this.totalStat = 10;
        this.success = "Hero has been created! Create another if you'd like.";
      } catch (error) {
        console.log(error);
      }
    },
    usePoint(type) {
      if (this.totalStat === 0) {
        return;
      }
      switch (type) {
        case "speed":
          this.speed++;
          this.totalStat = this.totalStat - 1;
          break;
        case "agility":
          this.agility++;
          this.totalStat = this.totalStat - 1;
          break;
        case "strength":
          this.strength++;
          this.totalStat = this.totalStat - 1;
          break;
        default:
          console.log("No stat type");
      }
    },

    resetPoint(type) {
      if (this.totalStat === 10) {
        return;
      }
      switch (type) {
        case "speed":
          this.speed--;
          this.totalStat = this.totalStat + 1;
          break;
        case "agility":
          this.agility--;
          this.totalStat++;
          break;
        case "strength":
          this.strength--;
          this.totalStat++;
          break;
        default:
          console.log("No stat type");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.create {
  background-color: lightcyan;
  padding: 20px 0;

  .hero-form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .stat-row {
      display: flex;
      padding: 10px 0;
      align-items: center;
      .minus {
        background-color: red;
        border: none;
        border-radius: 4px;
        height: 20px;
        padding: 5px 10px;
        display: flex;
        justify-content: center;
        cursor: pointer;
        align-items: center;
        margin-right: 10px;
      }
      .plus {
        background-color: lightgreen;
        padding: 5px 10px;
        display: flex;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 4px;
        height: 20px;
        margin-left: 10px;
      }
    }
  }
  .error {
    color: red;
  }
  .success {
    color: lightgreen;
  }
}
</style>

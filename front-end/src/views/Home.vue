<template>
  <div class="home">
    <div class="edit-block" v-if="editMode">
      <h2>Hero Training</h2>

      <form @submit="editSubmit" class="edit-form">
        <p class="cancel-button" @click="hideEdit">Cancel</p>
        <label>
          Name
          <input type="text" v-model="name" />
        </label>
        <h5>Points remaining: {{ totalStat }}</h5>
        <div class="edit-row">
          <button type="button" class="minus" @click="resetPoint('strength')">
            -
          </button>
          <p>Strength: {{ strength }}</p>
          <button type="button" class="plus" @click="usePoint('strength')">
            +
          </button>
        </div>
        <div class="edit-row">
          <button type="button" class="minus" @click="resetPoint('speed')">
            -
          </button>
          <p>Speed: {{ speed }}</p>
          <button type="button" class="plus" @click="usePoint('speed')">
            +
          </button>
        </div>
        <div class="edit-row">
          <button type="button" class="minus" @click="resetPoint('agility')">
            -
          </button>
          <p>Agility: {{ agility }}</p>
          <button type="button" class="plus" @click="usePoint('agility')">
            +
          </button>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
    <h2>Hall of Heroes</h2>
    <div class="list">
      <div
        class="hero-card"
        v-for="hero in heroes"
        :key="hero.name"
        @click="showEditHero(hero)"
      >
        <h5>
          {{ hero.name }}
        </h5>
        <div class="stat-row">
          <p>Strength: {{ hero.strength }}</p>
          <p>Speed: {{ hero.speed }}</p>
          <p>Agility: {{ hero.agility }}</p>
        </div>
        <h3>Train</h3>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      heroes: [],
      editMode: false,
      strength: 0,
      speed: 0,
      agility: 0,
      name: "",
      totalStat: 0,
      heroId: "",
    };
  },
  methods: {
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
    },
    showEditHero(hero) {
      this.strength = hero.strength;
      this.agility = hero.agility;
      this.speed = hero.speed;
      this.name = hero.name;
      this.totalStat = 10 - (hero.speed + hero.strength + hero.agility);
      this.heroId = hero._id;

      this.editMode = true;
    },
    hideEdit() {
      this.editMode = false;
    },

    async editSubmit(event) {
      event.preventDefault();
      if (this.name.length < 1) {
        this.error =
          "This hero has no name, and cannot claim any glory with no name.";
        return;
      } else {
        this.error = "";
      }

      try {
        const { data } = await axios.put("/api/hero/", {
          id: this.heroId,
          name: this.name,
          strength: this.strength,
          agility: this.agility,
          speed: this.speed,
        });

        this.editMode = false;
        // console.log(data);
        this.getHeroes();
      } catch (error) {
        console.log(error);
      }
    },
    async getHeroes() {
      try {
        const { data } = await axios.get("/api/hero");
        this.heroes = data.allHeros;
      } catch (error) {
        console.log(error);
      }
    },
  },

  async created() {
    this.getHeroes();
  },
};
</script>

<style lang="scss" scoped>
.home {
  .edit-form {
    background-color: lightcyan;
    border-radius: 10px;
    box-shadow: 0 2px 10px #00000032;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    margin: auto;
    padding: 20px;
    .cancel-button {
      cursor: pointer;
      padding: 15px;
      color: grey;
      font-weight: bold;
      align-self: flex-end;
    }

    .edit-row {
      display: flex;
      align-items: center;
      .minus {
        background-color: red;
        border: none;
        border-radius: 4px;
        height: 20px;
        margin-right: 10px;
      }
      .plus {
        background-color: lightgreen;
        border: none;
        border-radius: 4px;
        height: 20px;
        margin-left: 10px;
      }
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .hero-card {
      cursor: pointer;
      width: 200px;
      border-radius: 5px;
      background-color: lightgrey;
      box-shadow: 0 2px 10px #00000032;
      margin: 10px;
      transition-duration: 200ms;
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 14px #00000055;
      }
      .stat-row {
        display: flex;
        justify-content: space-evenly;
      }
    }
  }
}
</style>

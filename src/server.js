import { Server, Model } from "miragejs";
import faker from 'faker';

export function makeServer({ environment = "development" } = {}) {

  let getUser = (count) => {

    let arr = [];

    for (let i = 0; i < count; i++) {
      let userData = {
        id: faker.random.number(),
        geoData: faker.address.country(),
        device: faker.internet.userAgent(),
        version: faker.system.semver(),
        purchase: faker.random.number()
      }
      arr.push(userData)
    }

    return arr
  }

  console.log(getUser(10))

  let server = new Server({
    environment,

    models: {
      event: Model,
    },

    seeds(server) {
      server.create("event", getUser(1))
    },

    routes() {
      this.namespace = "api"

      this.get("/event/:id", (schema) => {
        return schema.events.all()
      })

      // this.get("/events", (schema) => {
      //   return schema.events.all()
      // })
    },
  })

  return server
}
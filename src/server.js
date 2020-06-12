import { Server, Model, Factory } from "miragejs";
import faker from 'faker';

export function makeServer({ environment = "development" } = {}) {

  let getUser = () => {


    let userData = {
      id: faker.random.number(),
      geoData: faker.address.country(),
      device: faker.internet.userAgent(),
      version: faker.system.semver(),
      purchase: faker.random.number()
    }

    return userData
  }
  console.log(getUser())

  let server = new Server({
    environment,

    models: {
      event: Model,
    },

    factories: {
      event: Factory.extend({
        id() {
          return faker.random.number()
        },

        geoData() {
          return faker.address.country()
        },

        device() {
          return faker.internet.userAgent()
        },

        version() {
          return faker.system.semver()
        },

        purchase() {
          return faker.random.number()
        }
      }),
    },

    seeds(server) {
      server.create("event", getUser())
      server.createList("event", 3)
    },

    routes() {
      this.namespace = "api"

      this.get("/event", (schema) => {
        return schema.events.all()
      })

      this.get("/events", (schema) => {

        return schema.events.all()
      })
    },
  })

  return server
}
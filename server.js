import { belongsTo, createServer, Factory, hasMany, Model, RestSerializer } from 'miragejs';
const SchoolModel = Model.extend({
  classes: hasMany(), 
});
const ClassModel = Model.extend({
  school: belongsTo(),
});

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,
    models: {
      school: SchoolModel,
      class: ClassModel,
    },
    serializers: {
      application: RestSerializer, 
      
      school: RestSerializer.extend({
        include: ['classes'], 
        embed: true,         
      }),
    },
    factories: {
      school: Factory.extend({
        id(i) {
          return `scl-${i + 1}`;
        },
        name(i) {
          return i % 2 === 0 ? 'Beacon High School' : 'Riverside Elementary';
        },
        address(i) {
          return i % 2 === 0 ? '450 Hillside Ave' : '10 Bridge St';
        },
      }),
      
      class: Factory.extend({
        id(i) {
          return `cls-${i + 1}`;
        },
        name(i) {
          const names = ['Advanced Calculus', 'Literature 12', 'Grade 3, Class A'];
          return names[i % names.length];
        },
        shift(i) {
          return i % 2 === 0 ? 'Morning' : 'Afternoon';
        },
        academicYear: 2025,
      }),
    },
    seeds(server) {
      let beacon = server.create('school');
      let riverside = server.create('school');
      server.createList('class', 2, { school: beacon });
      server.create('class', { school: riverside });
    },
    routes() {
      this.namespace = 'api'; 
      this.get('/schools');
      this.get('/schools/:id', (schema, request) => {
        let id = request.params.id;
        return schema.schools.find(id);
      });
      this.get('/classes', (schema, request) => {
        const schoolId = request.queryParams.schoolId;
        if (schoolId) {
          return schema.classes.where({ schoolId: schoolId });
        }
        return schema.classes.all();
      });
      this.get('/classes/:id', (schema, request) => {
        let id = request.params.id;
        return schema.classes.find(id);
      });
      
      this.post('/schools');
      this.post('/classes');
      this.put('/schools/:id');
      this.delete('/schools/:id');
      this.delete('/classes/:id');
      this.put('/classes/:id');
    },
  });
}
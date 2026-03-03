import { belongsTo, createServer, Factory, hasMany, Model, RestSerializer } from 'miragejs';

const SchoolModel = Model.extend({
  classes: hasMany(),
});

const ClassModel = Model.extend({
  school: belongsTo(),
});

const pick = (arr, i) => arr[i % arr.length];

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
          return `scl-${String(i + 1).padStart(3, '0')}`;
        },
        name(i) {
          const names = [
            'EMEF Monteiro Lobato',
            'EMEF Maria da Penha',
            'Escola Municipal Vila Nova',
            'Escola Municipal Primavera',
            'Colégio Municipal Rui Barbosa',
            'Escola Municipal Paulo Freire',
            'EMEF José de Alencar',
            'EMEF Tiradentes',
            'Escola Municipal Santo Antônio',
            'Escola Municipal Jardim das Flores',
            'EMEF Dom Pedro I',
            'EMEF Machado de Assis',
          ];
          return pick(names, i);
        },
        address(i) {
          const addresses = [
            'Rua das Acácias, 120 - Centro',
            'Av. Brasil, 890 - Jardim América',
            'Rua Sete de Setembro, 45 - Centro',
            'Av. Independência, 310 - Vila Nova',
            'Rua do Sol, 77 - Primavera',
            'Av. Getúlio Vargas, 1010 - Industrial',
            'Rua Projetada, 12 - Morada Nova',
            'Av. Principal, 500 - São José',
            'Rua dos Ipês, 220 - Jardim das Flores',
            'Rua dos Pioneiros, 18 - Santa Clara',
            'Av. São Paulo, 650 - Centro',
            'Rua da Escola, 99 - Alto Alegre',
          ];
          return pick(addresses, i);
        },
      }),

      class: Factory.extend({
        id(i) {
          return `cls-${String(i + 1).padStart(4, '0')}`;
        },
        name(i) {
          const names = [
            '1º Ano A',
            '1º Ano B',
            '2º Ano A',
            '2º Ano B',
            '3º Ano A',
            '3º Ano B',
            '4º Ano A',
            '5º Ano A',
            '6º Ano A',
            '7º Ano A',
            '8º Ano A',
            '9º Ano A',
          ];
          return pick(names, i);
        },
        shift(i) {
          const shifts = ['Morning', 'Afternoon', 'Night'];
          return pick(shifts, i);
        },
        academicYear(i) {
          const years = [2024, 2025, 2026];
          return pick(years, i);
        },
      }),
    },

    seeds(server) {
      const schools = server.createList('school', 3);

      schools.forEach((school, idx) => {
        const qty = 2;
        for (let j = 0; j < qty; j++) {
          server.create('class', { school });
        }
      });

      server.create('class', {
        school: schools[0],
        name: 'Pré II',
        shift: 'Morning',
        academicYear: 2025,
      });

      server.create('class', {
        school: schools[1],
        name: 'EJA I',
        shift: 'Night',
        academicYear: 2026,
      });
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
          return schema.classes.where({ schoolId });
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
      this.put('/classes/:id', (schema, request) => {
        const id = request.params.id
        const body = JSON.parse(request.requestBody || '{}')
        const attrs = body.class || {}

        const cls = schema.classes.find(id)
        if (!cls) return new Response(404, {}, { error: 'Class not found' })

        const nextSchoolId = attrs.schoolId ?? attrs.school

        if (nextSchoolId) {
          const school = schema.schools.find(nextSchoolId)
          if (!school) return new Response(400, {}, { error: 'Invalid schoolId' })

          cls.update({ schoolId: nextSchoolId })
        }

        cls.update({
          name: attrs.name ?? cls.name,
          shift: attrs.shift ?? cls.shift,
          academicYear: attrs.academicYear ?? cls.academicYear,
        })

        return schema.classes.find(id)
      })
      this.delete('/schools/:id');
      this.delete('/classes/:id');
    },
  });
}
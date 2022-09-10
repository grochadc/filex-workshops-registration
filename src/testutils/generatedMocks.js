import { createApolloMock } from 'apollo-typed-documents';

const operations = {};

export default createApolloMock(operations);

operations.reset = {};
operations.reset.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.reset.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ resetReservations = null }) => ({ resetReservations }))(values);
  values.__typename = __typename;
  return {
    resetReservations: (values.resetReservations === null || values.resetReservations === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'resetReservations', __typename, scalarValues: options.scalarValues }) : values.resetReservations
  };
};

operations.settings = {};
operations.settings.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.settings.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ isWorkshopsOpen = null, teachers = null }) => ({ isWorkshopsOpen, teachers }))(values);
  values.__typename = __typename;
  return {
    isWorkshopsOpen: (values.isWorkshopsOpen === null || values.isWorkshopsOpen === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'isWorkshopsOpen', __typename, scalarValues: options.scalarValues }) : values.isWorkshopsOpen,
    teachers: (values.teachers || []).map(item => ((values = {}, options = {}) => {
      const __typename = 'Teacher';
      values = (({ id = null, nombre = null }) => ({ id, nombre }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        nombre: (values.nombre === null || values.nombre === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nombre', __typename, scalarValues: options.scalarValues }) : values.nombre,
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.toggle = {};
operations.toggle.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.toggle.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ toggleOpenWorkshops = null }) => ({ toggleOpenWorkshops }))(values);
  values.__typename = __typename;
  return {
    toggleOpenWorkshops: (values.toggleOpenWorkshops === null || values.toggleOpenWorkshops === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'toggleOpenWorkshops', __typename, scalarValues: options.scalarValues }) : values.toggleOpenWorkshops
  };
};

operations.getSelectionInfo = {};
operations.getSelectionInfo.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ code = undefined }) => ({ code }))(values);
  values.__typename = __typename;
  return {
    code: (values.code === null || values.code === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'code', __typename, scalarValues: options.scalarValues }) : values.code
  };
};
operations.getSelectionInfo.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ isWorkshopsOpen = null, student = null, workshops = null }) => ({ isWorkshopsOpen, student, workshops }))(values);
  values.__typename = __typename;
  return {
    isWorkshopsOpen: (values.isWorkshopsOpen === null || values.isWorkshopsOpen === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'isWorkshopsOpen', __typename, scalarValues: options.scalarValues }) : values.isWorkshopsOpen,
    student: ((values = {}, options = {}) => {
      const __typename = 'Student';
      values = (({ id = null, codigo = null, nombre = null, nivel = null, reservation = null }) => ({ id, codigo, nombre, nivel, reservation }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        codigo: (values.codigo === null || values.codigo === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'codigo', __typename, scalarValues: options.scalarValues }) : values.codigo,
        nombre: (values.nombre === null || values.nombre === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nombre', __typename, scalarValues: options.scalarValues }) : values.nombre,
        nivel: (values.nivel === null || values.nivel === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'nivel', __typename, scalarValues: options.scalarValues }) : values.nivel,
        reservation: !values.reservation ? values.reservation : ((values = {}, options = {}) => {
          const __typename = 'Reservation';
          values = (({ option = null }) => ({ option }))(values);
          values.__typename = __typename;
          return {
            option: ((values = {}, options = {}) => {
              const __typename = 'Option';
              values = (({ workshop = null, day = null, time = null, teacher = null, url = null, isTutorial = null }) => ({ workshop, day, time, teacher, url, isTutorial }))(values);
              values.__typename = __typename;
              return {
                workshop: ((values = {}, options = {}) => {
                  const __typename = 'Workshop';
                  values = (({ name = null }) => ({ name }))(values);
                  values.__typename = __typename;
                  return {
                    name: (values.name === null || values.name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'name', __typename, scalarValues: options.scalarValues }) : values.name,
                    ...(options.addTypename ? { __typename } : {})
                  };
                })(values.workshop || undefined, options),
                day: (values.day === null || values.day === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'day', __typename, scalarValues: options.scalarValues }) : values.day,
                time: (values.time === null || values.time === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'time', __typename, scalarValues: options.scalarValues }) : values.time,
                teacher: ((values = {}, options = {}) => {
                  const __typename = 'Teacher';
                  values = (({ nombre = null }) => ({ nombre }))(values);
                  values.__typename = __typename;
                  return {
                    nombre: (values.nombre === null || values.nombre === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nombre', __typename, scalarValues: options.scalarValues }) : values.nombre,
                    ...(options.addTypename ? { __typename } : {})
                  };
                })(values.teacher || undefined, options),
                url: (values.url === null || values.url === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'url', __typename, scalarValues: options.scalarValues }) : values.url,
                isTutorial: (values.isTutorial === null || values.isTutorial === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'isTutorial', __typename, scalarValues: options.scalarValues }) : values.isTutorial,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.option || undefined, options),
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.reservation, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.student || undefined, options),
    workshops: (values.workshops || []).map(item => ((values = {}, options = {}) => {
      const __typename = 'Workshop';
      values = (({ id = null, name = null, description = null, levels = null, options = null }) => ({ id, name, description, levels, options }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        name: (values.name === null || values.name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'name', __typename, scalarValues: options.scalarValues }) : values.name,
        description: (values.description === null || values.description === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'description', __typename, scalarValues: options.scalarValues }) : values.description,
        levels: values.levels || [],
        options: (values.options || []).map(item => ((values = {}, options = {}) => {
          const __typename = 'Option';
          values = (({ id = null, day = null, time = null, teacher = null, url = null, zoom_id = null, available = null, active = null, isTutorial = null }) => ({ id, day, time, teacher, url, zoom_id, available, active, isTutorial }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            day: (values.day === null || values.day === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'day', __typename, scalarValues: options.scalarValues }) : values.day,
            time: (values.time === null || values.time === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'time', __typename, scalarValues: options.scalarValues }) : values.time,
            teacher: ((values = {}, options = {}) => {
              const __typename = 'Teacher';
              values = (({ nombre = null }) => ({ nombre }))(values);
              values.__typename = __typename;
              return {
                nombre: (values.nombre === null || values.nombre === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nombre', __typename, scalarValues: options.scalarValues }) : values.nombre,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.teacher || undefined, options),
            url: (values.url === null || values.url === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'url', __typename, scalarValues: options.scalarValues }) : values.url,
            zoom_id: values.zoom_id,
            available: (values.available === null || values.available === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'available', __typename, scalarValues: options.scalarValues }) : values.available,
            active: (values.active === null || values.active === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'active', __typename, scalarValues: options.scalarValues }) : values.active,
            isTutorial: (values.isTutorial === null || values.isTutorial === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'isTutorial', __typename, scalarValues: options.scalarValues }) : values.isTutorial,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.setReservation = {};
operations.setReservation.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ student_id = undefined, option_id = undefined }) => ({ student_id, option_id }))(values);
  values.__typename = __typename;
  return {
    student_id: (values.student_id === null || values.student_id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'student_id', __typename, scalarValues: options.scalarValues }) : values.student_id,
    option_id: (values.option_id === null || values.option_id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'option_id', __typename, scalarValues: options.scalarValues }) : values.option_id
  };
};
operations.setReservation.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ makeWorkshopReservation = null }) => ({ makeWorkshopReservation }))(values);
  values.__typename = __typename;
  return {
    makeWorkshopReservation: ((values = {}, options = {}) => {
      const __typename = 'Reservation';
      values = (({ option = null }) => ({ option }))(values);
      values.__typename = __typename;
      return {
        option: ((values = {}, options = {}) => {
          const __typename = 'Option';
          values = (({ day = null, time = null, teacher = null, workshop = null, url = null }) => ({ day, time, teacher, workshop, url }))(values);
          values.__typename = __typename;
          return {
            day: (values.day === null || values.day === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'day', __typename, scalarValues: options.scalarValues }) : values.day,
            time: (values.time === null || values.time === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'time', __typename, scalarValues: options.scalarValues }) : values.time,
            teacher: ((values = {}, options = {}) => {
              const __typename = 'Teacher';
              values = (({ nombre = null }) => ({ nombre }))(values);
              values.__typename = __typename;
              return {
                nombre: (values.nombre === null || values.nombre === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nombre', __typename, scalarValues: options.scalarValues }) : values.nombre,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.teacher || undefined, options),
            workshop: ((values = {}, options = {}) => {
              const __typename = 'Workshop';
              values = (({ name = null }) => ({ name }))(values);
              values.__typename = __typename;
              return {
                name: (values.name === null || values.name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'name', __typename, scalarValues: options.scalarValues }) : values.name,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.workshop || undefined, options),
            url: (values.url === null || values.url === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'url', __typename, scalarValues: options.scalarValues }) : values.url,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.option || undefined, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.makeWorkshopReservation || undefined, options)
  };
};

operations.getStudentProfile = {};
operations.getStudentProfile.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ code = undefined }) => ({ code }))(values);
  values.__typename = __typename;
  return {
    code: (values.code === null || values.code === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'code', __typename, scalarValues: options.scalarValues }) : values.code
  };
};
operations.getStudentProfile.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ student = null }) => ({ student }))(values);
  values.__typename = __typename;
  return {
    student: ((values = {}, options = {}) => {
      const __typename = 'Student';
      values = (({ id = null, codigo = null, nombre = null, apellido_paterno = null, apellido_materno = null, email = null, telefono = null, nivel = null, reservation = null, reservationCount = null, reservationLimit = null }) => ({ id, codigo, nombre, apellido_paterno, apellido_materno, email, telefono, nivel, reservation, reservationCount, reservationLimit }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        codigo: (values.codigo === null || values.codigo === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'codigo', __typename, scalarValues: options.scalarValues }) : values.codigo,
        nombre: (values.nombre === null || values.nombre === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nombre', __typename, scalarValues: options.scalarValues }) : values.nombre,
        apellido_paterno: (values.apellido_paterno === null || values.apellido_paterno === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'apellido_paterno', __typename, scalarValues: options.scalarValues }) : values.apellido_paterno,
        apellido_materno: (values.apellido_materno === null || values.apellido_materno === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'apellido_materno', __typename, scalarValues: options.scalarValues }) : values.apellido_materno,
        email: (values.email === null || values.email === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'email', __typename, scalarValues: options.scalarValues }) : values.email,
        telefono: (values.telefono === null || values.telefono === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'telefono', __typename, scalarValues: options.scalarValues }) : values.telefono,
        nivel: (values.nivel === null || values.nivel === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'nivel', __typename, scalarValues: options.scalarValues }) : values.nivel,
        reservation: !values.reservation ? values.reservation : ((values = {}, options = {}) => {
          const __typename = 'Reservation';
          values = (({ option = null }) => ({ option }))(values);
          values.__typename = __typename;
          return {
            option: ((values = {}, options = {}) => {
              const __typename = 'Option';
              values = (({ workshop = null, day = null, time = null, url = null, teacher = null }) => ({ workshop, day, time, url, teacher }))(values);
              values.__typename = __typename;
              return {
                workshop: ((values = {}, options = {}) => {
                  const __typename = 'Workshop';
                  values = (({ name = null }) => ({ name }))(values);
                  values.__typename = __typename;
                  return {
                    name: (values.name === null || values.name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'name', __typename, scalarValues: options.scalarValues }) : values.name,
                    ...(options.addTypename ? { __typename } : {})
                  };
                })(values.workshop || undefined, options),
                day: (values.day === null || values.day === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'day', __typename, scalarValues: options.scalarValues }) : values.day,
                time: (values.time === null || values.time === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'time', __typename, scalarValues: options.scalarValues }) : values.time,
                url: (values.url === null || values.url === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'url', __typename, scalarValues: options.scalarValues }) : values.url,
                teacher: ((values = {}, options = {}) => {
                  const __typename = 'Teacher';
                  values = (({ nombre = null }) => ({ nombre }))(values);
                  values.__typename = __typename;
                  return {
                    nombre: (values.nombre === null || values.nombre === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nombre', __typename, scalarValues: options.scalarValues }) : values.nombre,
                    ...(options.addTypename ? { __typename } : {})
                  };
                })(values.teacher || undefined, options),
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.option || undefined, options),
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.reservation, options),
        reservationCount: (values.reservationCount === null || values.reservationCount === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'reservationCount', __typename, scalarValues: options.scalarValues }) : values.reservationCount,
        reservationLimit: (values.reservationLimit === null || values.reservationLimit === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'reservationLimit', __typename, scalarValues: options.scalarValues }) : values.reservationLimit,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.student || undefined, options)
  };
};

operations.reservationsList = {};
operations.reservationsList.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ teacher_id = undefined }) => ({ teacher_id }))(values);
  values.__typename = __typename;
  return {
    teacher_id: (values.teacher_id === null || values.teacher_id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'teacher_id', __typename, scalarValues: options.scalarValues }) : values.teacher_id
  };
};
operations.reservationsList.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ teacher = null }) => ({ teacher }))(values);
  values.__typename = __typename;
  return {
    teacher: ((values = {}, options = {}) => {
      const __typename = 'Teacher';
      values = (({ id = null, nombre = null, options = null }) => ({ id, nombre, options }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        nombre: (values.nombre === null || values.nombre === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nombre', __typename, scalarValues: options.scalarValues }) : values.nombre,
        options: (values.options || []).map(item => ((values = {}, options = {}) => {
          const __typename = 'TeacherOption';
          values = (({ id = null, day = null, time = null, url = null, workshop = null, reservations = null }) => ({ id, day, time, url, workshop, reservations }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            day: (values.day === null || values.day === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'day', __typename, scalarValues: options.scalarValues }) : values.day,
            time: (values.time === null || values.time === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'time', __typename, scalarValues: options.scalarValues }) : values.time,
            url: (values.url === null || values.url === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'url', __typename, scalarValues: options.scalarValues }) : values.url,
            workshop: ((values = {}, options = {}) => {
              const __typename = 'Workshop';
              values = (({ name = null, id = null }) => ({ name, id }))(values);
              values.__typename = __typename;
              return {
                name: (values.name === null || values.name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'name', __typename, scalarValues: options.scalarValues }) : values.name,
                id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.workshop || undefined, options),
            reservations: (values.reservations || []).map(item => ((values = {}, options = {}) => {
              const __typename = 'Reservation';
              values = (({ id = null, student = null, tutorialReason = null, attended = null }) => ({ id, student, tutorialReason, attended }))(values);
              values.__typename = __typename;
              return {
                id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
                student: ((values = {}, options = {}) => {
                  const __typename = 'Student';
                  values = (({ codigo = null, nombre = null, apellido_paterno = null, apellido_materno = null, email = null, telefono = null, nivel = null, grupo = null }) => ({ codigo, nombre, apellido_paterno, apellido_materno, email, telefono, nivel, grupo }))(values);
                  values.__typename = __typename;
                  return {
                    codigo: (values.codigo === null || values.codigo === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'codigo', __typename, scalarValues: options.scalarValues }) : values.codigo,
                    nombre: (values.nombre === null || values.nombre === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nombre', __typename, scalarValues: options.scalarValues }) : values.nombre,
                    apellido_paterno: (values.apellido_paterno === null || values.apellido_paterno === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'apellido_paterno', __typename, scalarValues: options.scalarValues }) : values.apellido_paterno,
                    apellido_materno: (values.apellido_materno === null || values.apellido_materno === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'apellido_materno', __typename, scalarValues: options.scalarValues }) : values.apellido_materno,
                    email: (values.email === null || values.email === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'email', __typename, scalarValues: options.scalarValues }) : values.email,
                    telefono: (values.telefono === null || values.telefono === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'telefono', __typename, scalarValues: options.scalarValues }) : values.telefono,
                    nivel: (values.nivel === null || values.nivel === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'nivel', __typename, scalarValues: options.scalarValues }) : values.nivel,
                    grupo: (values.grupo === null || values.grupo === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'grupo', __typename, scalarValues: options.scalarValues }) : values.grupo,
                    ...(options.addTypename ? { __typename } : {})
                  };
                })(values.student || undefined, options),
                tutorialReason: values.tutorialReason,
                attended: (values.attended === null || values.attended === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'attended', __typename, scalarValues: options.scalarValues }) : values.attended,
                ...(options.addTypename ? { __typename } : {})
              };
            })(item, options)),
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.teacher || undefined, options)
  };
};

operations.saveAttendance = {};
operations.saveAttendance.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ attendingStudents = undefined, option_id = undefined, teacher_id = undefined }) => ({ attendingStudents, option_id, teacher_id }))(values);
  values.__typename = __typename;
  return {
    attendingStudents: (values.attendingStudents || []).map(item => (AttendingStudent)(item, options)),
    option_id: (values.option_id === null || values.option_id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'option_id', __typename, scalarValues: options.scalarValues }) : values.option_id,
    teacher_id: (values.teacher_id === null || values.teacher_id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'teacher_id', __typename, scalarValues: options.scalarValues }) : values.teacher_id
  };
};
operations.saveAttendance.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ saveWorkshopsAttendance = null }) => ({ saveWorkshopsAttendance }))(values);
  values.__typename = __typename;
  return {
    saveWorkshopsAttendance: (values.saveWorkshopsAttendance === null || values.saveWorkshopsAttendance === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'saveWorkshopsAttendance', __typename, scalarValues: options.scalarValues }) : values.saveWorkshopsAttendance
  };
};

operations.saveWorkshopUrl = {};
operations.saveWorkshopUrl.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ option_id = undefined, link = undefined }) => ({ option_id, link }))(values);
  values.__typename = __typename;
  return {
    option_id: (values.option_id === null || values.option_id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'option_id', __typename, scalarValues: options.scalarValues }) : values.option_id,
    link: (values.link === null || values.link === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'link', __typename, scalarValues: options.scalarValues }) : values.link
  };
};
operations.saveWorkshopUrl.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ setWorkshopLink = null }) => ({ setWorkshopLink }))(values);
  values.__typename = __typename;
  return {
    setWorkshopLink: (values.setWorkshopLink === null || values.setWorkshopLink === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'setWorkshopLink', __typename, scalarValues: options.scalarValues }) : values.setWorkshopLink
  };
};

operations.getTeacherList = {};
operations.getTeacherList.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.getTeacherList.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ teachers = null }) => ({ teachers }))(values);
  values.__typename = __typename;
  return {
    teachers: (values.teachers || []).map(item => ((values = {}, options = {}) => {
      const __typename = 'Teacher';
      values = (({ id = null, nombre = null }) => ({ id, nombre }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        nombre: (values.nombre === null || values.nombre === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nombre', __typename, scalarValues: options.scalarValues }) : values.nombre,
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

const AttendingStudent = (values = {}, options = {}) => {
  const __typename = 'AttendingStudent';
  values = (({ attended = undefined, id = undefined }) => ({ attended, id }))(values);
  values.__typename = __typename;
  return {
    attended: (values.attended === null || values.attended === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'attended', __typename, scalarValues: options.scalarValues }) : values.attended,
    id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id
  };
};
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
  values = (({ student = null, workshops = null }) => ({ student, workshops }))(values);
  values.__typename = __typename;
  return {
    student: ((values = {}, options = {}) => {
      const __typename = 'Student';
      values = (({ id = null, codigo = null, nombre = null, nivel = null, reservation = null }) => ({ id, codigo, nombre, nivel, reservation }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        codigo: (values.codigo === null || values.codigo === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'codigo', __typename, scalarValues: options.scalarValues }) : values.codigo,
        nombre: (values.nombre === null || values.nombre === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nombre', __typename, scalarValues: options.scalarValues }) : values.nombre,
        nivel: (values.nivel === null || values.nivel === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nivel', __typename, scalarValues: options.scalarValues }) : values.nivel,
        reservation: !values.reservation ? values.reservation : ((values = {}, options = {}) => {
          const __typename = 'StudentReservation';
          values = (({ workshop_name = null, day = null, time = null, teacher_name = null, url = null, zoom_id = null }) => ({ workshop_name, day, time, teacher_name, url, zoom_id }))(values);
          values.__typename = __typename;
          return {
            workshop_name: (values.workshop_name === null || values.workshop_name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'workshop_name', __typename, scalarValues: options.scalarValues }) : values.workshop_name,
            day: (values.day === null || values.day === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'day', __typename, scalarValues: options.scalarValues }) : values.day,
            time: (values.time === null || values.time === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'time', __typename, scalarValues: options.scalarValues }) : values.time,
            teacher_name: (values.teacher_name === null || values.teacher_name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'teacher_name', __typename, scalarValues: options.scalarValues }) : values.teacher_name,
            url: (values.url === null || values.url === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'url', __typename, scalarValues: options.scalarValues }) : values.url,
            zoom_id: values.zoom_id,
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
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        name: (values.name === null || values.name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'name', __typename, scalarValues: options.scalarValues }) : values.name,
        description: (values.description === null || values.description === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'description', __typename, scalarValues: options.scalarValues }) : values.description,
        levels: values.levels || [],
        options: (values.options || []).map(item => ((values = {}, options = {}) => {
          const __typename = 'Option';
          values = (({ id = null, workshop_id = null, workshop_name = null, day = null, time = null, teacher_name = null, teacher_id = null, url = null, zoom_id = null, isTutorial = null, available = null }) => ({ id, workshop_id, workshop_name, day, time, teacher_name, teacher_id, url, zoom_id, isTutorial, available }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            workshop_id: (values.workshop_id === null || values.workshop_id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'workshop_id', __typename, scalarValues: options.scalarValues }) : values.workshop_id,
            workshop_name: (values.workshop_name === null || values.workshop_name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'workshop_name', __typename, scalarValues: options.scalarValues }) : values.workshop_name,
            day: (values.day === null || values.day === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'day', __typename, scalarValues: options.scalarValues }) : values.day,
            time: (values.time === null || values.time === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'time', __typename, scalarValues: options.scalarValues }) : values.time,
            teacher_name: (values.teacher_name === null || values.teacher_name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'teacher_name', __typename, scalarValues: options.scalarValues }) : values.teacher_name,
            teacher_id: (values.teacher_id === null || values.teacher_id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'teacher_id', __typename, scalarValues: options.scalarValues }) : values.teacher_id,
            url: (values.url === null || values.url === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'url', __typename, scalarValues: options.scalarValues }) : values.url,
            zoom_id: values.zoom_id,
            isTutorial: (values.isTutorial === null || values.isTutorial === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'isTutorial', __typename, scalarValues: options.scalarValues }) : values.isTutorial,
            available: (values.available === null || values.available === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'available', __typename, scalarValues: options.scalarValues }) : values.available,
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
  values = (({ student_id = undefined, option_id = undefined, tutorial_reason = undefined }) => ({ student_id, option_id, tutorial_reason }))(values);
  values.__typename = __typename;
  return {
    student_id: (values.student_id === null || values.student_id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'student_id', __typename, scalarValues: options.scalarValues }) : values.student_id,
    option_id: (values.option_id === null || values.option_id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'option_id', __typename, scalarValues: options.scalarValues }) : values.option_id,
    tutorial_reason: values.tutorial_reason
  };
};
operations.setReservation.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ makeWorkshopReservation = null }) => ({ makeWorkshopReservation }))(values);
  values.__typename = __typename;
  return {
    makeWorkshopReservation: ((values = {}, options = {}) => {
      const __typename = 'StudentReservation';
      values = (({ day = null, time = null, teacher_name = null, workshop_name = null, url = null, zoom_id = null }) => ({ day, time, teacher_name, workshop_name, url, zoom_id }))(values);
      values.__typename = __typename;
      return {
        day: (values.day === null || values.day === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'day', __typename, scalarValues: options.scalarValues }) : values.day,
        time: (values.time === null || values.time === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'time', __typename, scalarValues: options.scalarValues }) : values.time,
        teacher_name: (values.teacher_name === null || values.teacher_name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'teacher_name', __typename, scalarValues: options.scalarValues }) : values.teacher_name,
        workshop_name: (values.workshop_name === null || values.workshop_name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'workshop_name', __typename, scalarValues: options.scalarValues }) : values.workshop_name,
        url: (values.url === null || values.url === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'url', __typename, scalarValues: options.scalarValues }) : values.url,
        zoom_id: values.zoom_id,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.makeWorkshopReservation || undefined, options)
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
      values = (({ id = null, name = null, options = null }) => ({ id, name, options }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        name: (values.name === null || values.name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'name', __typename, scalarValues: options.scalarValues }) : values.name,
        options: (values.options || []).map(item => ((values = {}, options = {}) => {
          const __typename = 'TeacherOption';
          values = (({ id = null, day = null, time = null, url = null, workshop_name = null, workshop_id = null, reservations = null }) => ({ id, day, time, url, workshop_name, workshop_id, reservations }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            day: (values.day === null || values.day === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'day', __typename, scalarValues: options.scalarValues }) : values.day,
            time: (values.time === null || values.time === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'time', __typename, scalarValues: options.scalarValues }) : values.time,
            url: (values.url === null || values.url === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'url', __typename, scalarValues: options.scalarValues }) : values.url,
            workshop_name: (values.workshop_name === null || values.workshop_name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'workshop_name', __typename, scalarValues: options.scalarValues }) : values.workshop_name,
            workshop_id: (values.workshop_id === null || values.workshop_id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'workshop_id', __typename, scalarValues: options.scalarValues }) : values.workshop_id,
            reservations: !values.reservations ? values.reservations : values.reservations.map(item => ((values = {}, options = {}) => {
              const __typename = 'Reservation';
              values = (({ id = null, codigo = null, nombre = null, apellido_paterno = null, apellido_materno = null, nivel = null, grupo = null, tutorial_reason = null }) => ({ id, codigo, nombre, apellido_paterno, apellido_materno, nivel, grupo, tutorial_reason }))(values);
              values.__typename = __typename;
              return {
                id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
                codigo: (values.codigo === null || values.codigo === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'codigo', __typename, scalarValues: options.scalarValues }) : values.codigo,
                nombre: (values.nombre === null || values.nombre === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nombre', __typename, scalarValues: options.scalarValues }) : values.nombre,
                apellido_paterno: (values.apellido_paterno === null || values.apellido_paterno === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'apellido_paterno', __typename, scalarValues: options.scalarValues }) : values.apellido_paterno,
                apellido_materno: (values.apellido_materno === null || values.apellido_materno === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'apellido_materno', __typename, scalarValues: options.scalarValues }) : values.apellido_materno,
                nivel: (values.nivel === null || values.nivel === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nivel', __typename, scalarValues: options.scalarValues }) : values.nivel,
                grupo: (values.grupo === null || values.grupo === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'grupo', __typename, scalarValues: options.scalarValues }) : values.grupo,
                tutorial_reason: values.tutorial_reason,
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
  values = (({ students = undefined, option_id = undefined, teacher_id = undefined }) => ({ students, option_id, teacher_id }))(values);
  values.__typename = __typename;
  return {
    students: (values.students || []).map(item => (AttendingStudent)(item, options)),
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
      values = (({ id = null, name = null }) => ({ id, name }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        name: (values.name === null || values.name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'name', __typename, scalarValues: options.scalarValues }) : values.name,
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

const AttendingStudent = (values = {}, options = {}) => {
  const __typename = 'AttendingStudent';
  values = (({ apellido_materno = undefined, apellido_paterno = undefined, attended = undefined, codigo = undefined, grupo = undefined, nivel = undefined, nombre = undefined, teacher = undefined, workshop = undefined }) => ({ apellido_materno, apellido_paterno, attended, codigo, grupo, nivel, nombre, teacher, workshop }))(values);
  values.__typename = __typename;
  return {
    apellido_materno: values.apellido_materno,
    apellido_paterno: (values.apellido_paterno === null || values.apellido_paterno === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'apellido_paterno', __typename, scalarValues: options.scalarValues }) : values.apellido_paterno,
    attended: (values.attended === null || values.attended === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'attended', __typename, scalarValues: options.scalarValues }) : values.attended,
    codigo: (values.codigo === null || values.codigo === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'codigo', __typename, scalarValues: options.scalarValues }) : values.codigo,
    grupo: (values.grupo === null || values.grupo === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'grupo', __typename, scalarValues: options.scalarValues }) : values.grupo,
    nivel: (values.nivel === null || values.nivel === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nivel', __typename, scalarValues: options.scalarValues }) : values.nivel,
    nombre: (values.nombre === null || values.nombre === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nombre', __typename, scalarValues: options.scalarValues }) : values.nombre,
    teacher: (values.teacher === null || values.teacher === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'teacher', __typename, scalarValues: options.scalarValues }) : values.teacher,
    workshop: (values.workshop === null || values.workshop === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'workshop', __typename, scalarValues: options.scalarValues }) : values.workshop
  };
};
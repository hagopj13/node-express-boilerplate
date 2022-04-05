import mongoose, { ObjectId } from 'mongoose';
import { setupTestDB } from '../../../utils/setupTestDB';
import { paginate } from '../../../../src/models/plugins/paginate.plugin';
import { ReturnModelType, getModelForClass, plugin, prop, Ref, DocumentType } from '@typegoose/typegoose';


let Task: ReturnModelType<typeof TaskClass>;
let Project: ReturnModelType<typeof ProjectClass>;
@plugin(paginate)
class ProjectClass {
  public static paginate: ReturnType<typeof paginate>;

  @prop({ required: true })
  public name!: string;

  @prop({
    ref: () => TaskClass,
    foreignField: 'project',
    localField: '_id'
  })
  public tasks!: Ref<TaskClass>[];
}

@plugin(paginate)
class TaskClass {
  public static paginate: ReturnType<typeof paginate>;

  @prop({ required: true })
  public name!: string;

  @prop({ 
    required: true,
    ref: () => ProjectClass,
    type: mongoose.SchemaTypes.ObjectId,
  })
  public project!: Ref<ProjectClass>;
}

Task = getModelForClass(TaskClass, { schemaOptions: { timestamps: true } }) 
Project = getModelForClass(ProjectClass, { schemaOptions: { timestamps: true } }) 

setupTestDB();

describe('paginate plugin', () => {
  describe('populate option', () => {
    test('should populate the specified data fields', async () => {
      const project = await Project.create({ name: 'Project One' });
      const task = await Task.create({ name: 'Task One', project: project._id });

      const taskPages = await Task.paginate({ _id: task._id }, { populate: 'project' });

      expect(taskPages.results[0].project).toHaveProperty('_id', project._id);
    });

    test('should populate nested fields', async () => {
      const project = await Project.create({ name: 'Project One' });
      const task = await Task.create({ name: 'Task One', project: project._id });

      const projectPages = await Project.paginate({ _id: project._id }, { populate: 'tasks.project' });
      const { tasks } = projectPages.results[0];

      expect(tasks).toHaveLength(1);
      expect(tasks[0]).toHaveProperty('_id', task._id);
      expect(tasks[0].project).toHaveProperty('_id', project._id);
    });
  });
});

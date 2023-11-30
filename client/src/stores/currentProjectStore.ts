import { makeAutoObservable } from "mobx"
import User from "../types/user-types"
import Project from "../types/project-type";

export default new class CurrentProjectStore {
    project: Project | null | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setProject(project: Project) {
        this.project = {...project};
    }

    resetProject() {
        this.project = null;
    }
}
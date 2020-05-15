module.exports = (sequelize, DataTypes) => {
    const Projects = sequelize.define('projects', {
        projectName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        projectDescription: {
        type: DataTypes.STRING,
        allowNull: false
        },
        yarn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hookSize: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return Projects;
}
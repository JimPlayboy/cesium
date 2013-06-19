/*global define*/
define([
        '../Core/defaultValue',
        '../Core/freezeObject',
        '../Core/VertexFormat',
        '../Renderer/CullFace',
        '../Renderer/BlendingState',
        './Material',
        './Appearance',
        '../Shaders/Appearances/EllipsoidSurfaceAppearanceVS',
        '../Shaders/Appearances/EllipsoidSurfaceAppearanceFS'
    ], function(
        defaultValue,
        freezeObject,
        VertexFormat,
        CullFace,
        BlendingState,
        Material,
        Appearance,
        EllipsoidSurfaceAppearanceVS,
        EllipsoidSurfaceAppearanceFS) {
    "use strict";

    /**
     * DOC_TBA
     */
    var EllipsoidSurfaceAppearance = function(options) {
        options = defaultValue(options, defaultValue.EMPTY_OBJECT);

        /**
         * DOC_TBA
         */
        this.material = (typeof options.material !== 'undefined') ? options.material : Material.fromType(undefined, Material.ColorType);

        /**
         * DOC_TBA
         */
        this.vertexFormat = EllipsoidSurfaceAppearance.VERTEX_FORMAT;

        /**
         * DOC_TBA
         */
        this.vertexShaderSource = defaultValue(options.vertexShaderSource, EllipsoidSurfaceAppearanceVS);

        /**
         * DOC_TBA
         */
        this.fragmentShaderSource = defaultValue(options.fragmentShaderSource, EllipsoidSurfaceAppearanceFS);

        /**
         * DOC_TBA
         */
        this.translucent = defaultValue(options.translucent, true);

        /**
         * DOC_TBA
         */
        this.closed = false;

        /**
         * DOC_TBA
         */
        this.aboveGround = defaultValue(options.aboveGround, false);

        var rs = {
            depthTest : {
                enabled : true
            }
        };

        if (!this.aboveGround) {
            rs.cull = {
                enabled : true,
                face : CullFace.BACK
            };
        }

        if (this.translucent) {
            rs.depthMask = false;
            rs.blending = BlendingState.ALPHA_BLEND;
        }

        /**
         * DOC_TBA
         */
        this.renderState = defaultValue(options.renderState, rs);
    };

    /**
     * DOC_TBA
     */
    EllipsoidSurfaceAppearance.VERTEX_FORMAT = freezeObject(VertexFormat.POSITION_AND_ST);

    /**
     * DOC_TBA
     */
    EllipsoidSurfaceAppearance.prototype.getFragmentShaderSource = Appearance.prototype.getFragmentShaderSource;

    return EllipsoidSurfaceAppearance;
});
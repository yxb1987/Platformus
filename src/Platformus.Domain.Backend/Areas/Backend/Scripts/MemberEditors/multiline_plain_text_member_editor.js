﻿// Copyright © 2015 Dmitry Sikorsky. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

(function (platformus) {
  platformus.memberEditors = platformus.memberEditors || [];
  platformus.memberEditors.multilinePlainText = {};
  platformus.memberEditors.multilinePlainText.create = function (container, member) {
    createField(member).appendTo(container);
  };

  function createField(member) {
    var field = $("<div>").addClass("form__field").addClass("field");

    platformus.memberEditors.base.createLabel(member).appendTo(field);

    if (member.isPropertyLocalizable) {
      field.addClass("field--multilingual")

      for (var i = 0; i < member.property.stringValue.localizations.length; i++) {
        var localization = member.property.stringValue.localizations[i];

        if (localization.culture.code != "__") {
          platformus.memberEditors.base.createCulture(localization).appendTo(field);
          createTextArea(member, localization).appendTo(field);

          if (i != member.property.stringValue.localizations.length - 1) {
            platformus.memberEditors.base.createMultilingualSeparator().appendTo(field);
          }
        }
      }
    }

    else {
      for (var i = 0; i < member.property.stringValue.localizations.length; i++) {
        var localization = member.property.stringValue.localizations[i];

        if (localization.culture.code == "__") {
          createTextArea(member, localization).appendTo(field);
        }
      }
    }

    return field;
  }

  function createTextArea(member, localization) {
    var identity = platformus.memberEditors.base.getIdentity(member, localization);
    var textArea = $("<textarea>").addClass("field__text-area");

    if (localization.culture.code != "__") {
      textArea.addClass("field__text-area--multilingual");
    }

    return textArea
      .addClass("text-area")
      .attr("id", identity)
      .attr("name", identity)
      .attr("data-culture", localization.culture.code)
      .html(localization.value);
  }
})(window.platformus = window.platformus || {});
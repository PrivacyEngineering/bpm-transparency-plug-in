import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

export function findExtensions(element, types) {
  const extensionElements = getBusinessObject(element).get('extensionElements');

  if (!extensionElements) {
    return [];
  }
  if (types){
    var properties = extensionElements.get('values').filter((value) => {
      return isAny(value, [].concat(types));
    });
    if (properties.length) {
      return properties;
    } else {
      return [];
    }
  }else{
    return extensionElements.get('values')
  }
}

export function getXMLTiltMetaProperties(element){
  const bo = getBusinessObject(element);
  const properties = findExtensions(bo,'tilt:Meta');
  if (properties.length) {
    return properties[0];
  }
  return null;
}

export function createExtensionElements(element, bpmnFactory) {
  const bo = getBusinessObject(element);
  return createElement('bpmn:ExtensionElements', { values: []}, bo, bpmnFactory);
}
export function createTiltMetaProperty(extensionElements, bpmnFactory, properties) {
  return createElement('tilt:Meta', properties, extensionElements, bpmnFactory);
}

export function createElement(elementType, properties, parent, factory) {
  const element = factory.create(elementType, properties);
  element.$parent = parent;

  return element;
}
